import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { JWT_ACCESS_TOKEN } from '@/utils/cookiesName';

// The basic next-intl routing middleware
const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const authRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
  // 1. Run next-intl middleware to handle locale redirects (/uk /en)
  const response = intlMiddleware(request);

  // 2. Authentication check
  const token = request.cookies.get(JWT_ACCESS_TOKEN)?.value;
  // Get pathname WITHOUT the locale prefix to check routes correctly!
  const pathname = request.nextUrl.pathname;
  
  // A helper to check if current path matches any of our target routes
  // taking into account potential locale prefixes (e.g. /uk/dashboard or /dashboard)
  const checkRoute = (routes: string[]) => {
    return routes.some(route => {
      // Matches EXACTLY the route, OR matches with a locale prefix
      return pathname.startsWith(route) || pathname.match(new RegExp(`^/(${routing.locales.join('|')})${route}`));
    });
  };

  const isProtectedRoute = checkRoute(protectedRoutes);
  const isAuthRoute = checkRoute(authRoutes);  
  const currentLocale = request.nextUrl.pathname.split('/')[1];
  const localePrefix = routing.locales.includes(currentLocale as any) ? `/${currentLocale}` : '';
  const isServerAction = request.headers.has('next-action');

  if (isProtectedRoute && !token) {
    // Redirect to the localized login page
    return NextResponse.redirect(new URL(`${localePrefix}/login`, request.url));
  }

// 1. Редирект для захищених роутів (Dashboard тощо)
if (isProtectedRoute && !token) {
  return NextResponse.redirect(new URL(`${localePrefix}/login`, request.url));
}
// 2. Редирект з логіна, якщо вже авторизований (але НЕ для Server Actions)
if (isAuthRoute && token && !isServerAction && request.method !== 'POST') {
  return NextResponse.redirect(new URL(`${localePrefix}/dashboard`, request.url));
}

  return response;
}

export const config = {
  // Match only internationalized pathnames, skipping next assets and api routes
  matcher: ['/', '/(uk|en)/:path*', '/((?!api|_categories|_next/static|_next/image|favicon.ico).*)']
};

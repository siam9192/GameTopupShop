import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './api-services/user';
import { Administrator } from './types/administrator.type';
import { UserRole } from './types/user.type';

// ✅ Define accessible routes for each role
const roleBaseRoutes: Record<string, RegExp[]> = {
  Customer: [/^\/dashboard/],
  Moderator: [/^\/control-dashboard/],
  Admin: [/^\/control-dashboard/],
  Super_Admin: [/^\/control-dashboard/],
};

// ❌ Define not-accessible (restricted) routes for specific roles
const roleBaseNotAccessibleRoutes: Record<string, RegExp[]> = {
  Moderator: [/^\/control-dashboard\/app-settings\/[^/]+$/],
  Admin: [/^\/control-dashboard\/app-settings\/[^/]+$/],
  Super_Admin: [/^\/control-dashboard\/app-settings\/[^/]+$/],
};

// ✅ Routes that don't require authentication
const authRoutes = ['/login', '/signup', '/administrator-signin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let userResponse;
  try {
    userResponse = await getCurrentUser();
  } catch {
    // If the API call fails, treat as unauthenticated
    userResponse = null;
  }

  const user = userResponse?.data;

  // ✅ If logged in and trying to access auth pages → redirect home
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ If not logged in
  if (!user) {
    if (authRoutes.includes(pathname)) {
      // Allow login/signup access
      return NextResponse.next();
    }
    // Redirect to login page with redirect query
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Determine user role
  const userRole =
    Object.hasOwn(user, 'level') && (user as Administrator).level
      ? (user as Administrator).level
      : UserRole.CUSTOMER;

  const allowedRoutes = roleBaseRoutes[userRole] || [];
  const notAllowedRoutes = roleBaseNotAccessibleRoutes[userRole] || [];

  const isAllowed = allowedRoutes.some((route) => route.test(pathname));
  const isNotAllowed = notAllowedRoutes.some((route) => route.test(pathname));

  // ✅ If route is allowed and not restricted
  if (isAllowed && !isNotAllowed) {
    return NextResponse.next();
  }

  // ❌ If route is restricted for the user
  if (isNotAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // ✅ Default allow
  return NextResponse.next();
}

// ✅ Apply middleware to restricted and auth routes
export const config = {
  matcher: ['/dashboard/:path*', '/control-dashboard/:path*'],
};

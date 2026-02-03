import dynamic from 'next/dynamic';
import React from 'react'
import { isUserAuthenticated } from '@/lib/auth';

const AuthButtons = () => {

    // Dynamically import LogoutLink to handle missing Kinde config
    const LogoutLink = dynamic(
      () => import("@kinde-oss/kinde-auth-nextjs/components")
        .then((mod) => mod.LogoutLink)
        .catch(() => {
          return ({ children, className, ...props }: any) => null;
        }),
      { 
        ssr: false,
        loading: () => null
      }
    );

    const LoginLink = dynamic(
      () => import("@kinde-oss/kinde-auth-nextjs/components")
        .then((mod) => mod.LoginLink)
        .catch(() => {
          return ({ children, className, ...props }: any) => null;
        }),
      { 
        ssr: false,
        loading: () => null
      }
    );
    
  return (
    <>
    {isUserAuthenticated() ? 
        <LogoutLink className="block p-2 text-gray-700 hover:bg-gray-100 rounded w-full text-left">
                Sign Out
        </LogoutLink>
        : (
        <LoginLink className="block p-2 text-gray-700 hover:bg-gray-100 rounded w-full text-left">
                Sign In
        </LoginLink>
        )}
    </>
  )
}

export default AuthButtons
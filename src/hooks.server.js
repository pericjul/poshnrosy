// src/hooks.server.js

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const sessionCookie = event.cookies.get("session_user");
  
    if (sessionCookie) {
      try {
        const user = JSON.parse(sessionCookie);
        event.locals.user = user;
      } catch (e) {
        event.locals.user = null;
      }
    } else {
      event.locals.user = null;
    }
  
    return await resolve(event);
  }
  
const isLocalhost: boolean = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

interface Config {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

const publicUrl1 = (typeof process !== 'undefined' && process.env.REACT_APP_PUBLIC_URL) ?? 'http://localhost:8100';

const swUrl = `${publicUrl1}/service-worker.js`;




export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(swUrl, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      // const swUrl = `${publicUr1l}/service-worker.js`;

      if (isLocalhost) {
        // Check if service worker exists on localhost and validate
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log('App is being served by a service worker in cache-first mode.');
        });
      } else {
        // Register the service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker.register(swUrl).then((registration) => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('New content is available; please refresh.');
            // Trigger update notification for the user
            notifyUser('New content available! Please refresh.');

            if (config?.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            console.log('Content is cached for offline use.');
            notifyUser('App is ready for offline use!');

            if (config?.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  }).catch((error) => {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  }).then((response) => {
    const contentType = response.headers.get('content-type');
    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Register the valid service worker
      registerValidSW(swUrl, config);
    }
  }).catch(() => {
    console.log('No internet connection. Running in offline mode.');
    notifyUser('You are offline. Running in offline mode.');
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    }).catch((error) => {
      console.error(error.message);
    });
  }
}

function notifyUser(message: string) {
  const notification = document.createElement('div');
  notification.className = 'sw-notification';
  notification.innerText = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 5000);
}

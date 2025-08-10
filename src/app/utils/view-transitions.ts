export const startViewTransition = (callback: () => void) => {
  if (!document.startViewTransition) {
    console.log('startViewTransition not supported');
    callback();
  } else {
    document.startViewTransition(callback);
  }
};

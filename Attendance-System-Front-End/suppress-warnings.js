// Script to suppress face-api.js warnings
// This can be run before starting the development server

const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Suppress specific warnings
console.warn = function (...args) {
  const message = args.join(" ");
  if (
    message.includes("Failed to parse source map") ||
    message.includes("Can't resolve 'fs'") ||
    message.includes("face-api.js")
  ) {
    return; // Suppress these warnings
  }
  originalConsoleWarn.apply(console, args);
};

console.error = function (...args) {
  const message = args.join(" ");
  if (
    message.includes("Failed to parse source map") ||
    message.includes("Can't resolve 'fs'") ||
    message.includes("face-api.js")
  ) {
    return; // Suppress these errors
  }
  originalConsoleError.apply(console, args);
};

console.log("Warning suppression enabled for face-api.js");



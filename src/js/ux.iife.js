/**
 * UX JavaScript Library - IIFE Entry
 * This file is the entry point for browser builds (IIFE format)
 * It ensures window.UX is the UX object directly
 *
 * For ES module imports, use ux.js instead
 */

// Import the main UX module
import UX from './ux.js';

// This is the only export, ensuring clean IIFE output
export default UX;

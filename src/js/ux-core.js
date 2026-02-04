/**
 * UX Core Build
 * Slimmed-down bundle with only the essential interactive components.
 */

import '../scss/ux.scss';

import { createUX } from './core/ux-factory.js';
import { UXModal } from './components/modal.js';
import { UXPassword } from './components/password.js';
import { UXRange } from './components/range.js';
import { UXOtpInput } from './components/otp-input.js';

const UXCore = createUX({
  version: '2.0.0',
  classMap: {
    'ux-modal-backdrop': UXModal,
    'ux-input-password': UXPassword,
    'ux-range': UXRange,
    'ux-otp': UXOtpInput,
  },
  attributeMap: {
    'data-ux-password': UXPassword,
    'data-ux-range': UXRange,
    'data-ux-otp': UXOtpInput,
  },
  manualMap: {
    modal: UXModal,
    password: UXPassword,
    range: UXRange,
    otp: UXOtpInput,
    otpinput: UXOtpInput,
  },
  exportedComponents: {
    Modal: UXModal,
    Password: UXPassword,
    Range: UXRange,
    OtpInput: UXOtpInput,
  },
});

export {
  UXCore,
  UXModal,
  UXPassword,
  UXRange,
  UXOtpInput,
};

export default UXCore;

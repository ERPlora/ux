/**
 * UX JavaScript Library
 * Optional enhancements for the UX CSS Library
 *
 * @version 2.0.0
 * @license MIT
 */

import '../scss/ux.scss';

import { createUX } from './core/ux-factory.js';
import { UXModal } from './components/modal.js';
import { UXPassword } from './components/password.js';
import { UXRange } from './components/range.js';
import { UXOtpInput } from './components/otp-input.js';
import { UXAutocomplete } from './components/autocomplete.js';
import { UXTagInput } from './components/tag-input.js';
import { UXUpload } from './components/upload.js';
import { UXQuantityStepper } from './components/quantity-stepper.js';
import { UXSignaturePad } from './components/signature-pad.js';

const UX = createUX({
  version: '2.0.0',
  classMap: {
    'ux-modal-backdrop': UXModal,
    'ux-input-password': UXPassword,
    'ux-range': UXRange,
    'ux-otp': UXOtpInput,
    'ux-autocomplete': UXAutocomplete,
    'ux-tag-input': UXTagInput,
    'ux-upload': UXUpload,
    'ux-quantity-stepper': UXQuantityStepper,
    'ux-signature-pad': UXSignaturePad,
  },
  attributeMap: {
    'data-ux-password': UXPassword,
    'data-ux-range': UXRange,
    'data-ux-otp': UXOtpInput,
    'data-ux-autocomplete': UXAutocomplete,
    'data-ux-tag-input': UXTagInput,
    'data-ux-upload': UXUpload,
    'data-ux-quantity-stepper': UXQuantityStepper,
    'data-ux-signature-pad': UXSignaturePad,
  },
  manualMap: {
    modal: UXModal,
    password: UXPassword,
    range: UXRange,
    otp: UXOtpInput,
    otpinput: UXOtpInput,
    autocomplete: UXAutocomplete,
    taginput: UXTagInput,
    'tag-input': UXTagInput,
    upload: UXUpload,
    quantitystepper: UXQuantityStepper,
    'quantity-stepper': UXQuantityStepper,
    signaturepad: UXSignaturePad,
    'signature-pad': UXSignaturePad,
  },
  exportedComponents: {
    Modal: UXModal,
    Password: UXPassword,
    Range: UXRange,
    OtpInput: UXOtpInput,
    Autocomplete: UXAutocomplete,
    TagInput: UXTagInput,
    Upload: UXUpload,
    QuantityStepper: UXQuantityStepper,
    SignaturePad: UXSignaturePad,
  },
});

export {
  UX,
  UXModal,
  UXPassword,
  UXRange,
  UXOtpInput,
  UXAutocomplete,
  UXTagInput,
  UXUpload,
  UXQuantityStepper,
  UXSignaturePad,
};

export default UX;

if (typeof window !== 'undefined') {
  window.UX = UX;
}

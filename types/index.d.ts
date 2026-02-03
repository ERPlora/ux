export interface UXModalOptions {
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  trapFocus?: boolean;
}

export class UXModal {
  constructor(element: Element | string, options?: UXModalOptions);
  open(): void;
  close(): void;
  toggle(): void;
  isOpen(): boolean;
  destroy(): void;
}

export interface UXPasswordOptions {
  inputSelector?: string;
  toggleSelector?: string;
}

export class UXPassword {
  constructor(element: Element | string, options?: UXPasswordOptions);
  show(): void;
  hide(): void;
  toggle(): void;
  isVisible(): boolean;
  getValue(): string;
  setValue(value: string): void;
  destroy(): void;
}

export interface UXRangeOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export class UXRange {
  constructor(element: Element | string, options?: UXRangeOptions);
  get value(): number;
  set value(val: number);
  setValue(value: number): void;
  increment(): void;
  decrement(): void;
  reset(): void;
  destroy(): void;
}

export interface UXOtpInputOptions {
  length?: number;
  type?: 'number' | 'alphanumeric';
}

export class UXOtpInput {
  constructor(element: Element | string, options?: UXOtpInputOptions);
  get value(): string;
  get isComplete(): boolean;
  setValue(value: string | number): void;
  clear(): void;
  focus(): void;
  destroy(): void;
}

export interface UXAutocompleteOptions {
  items?: Array<string | Record<string, unknown>>;
  fetchUrl?: string;
  minChars?: number;
}

export class UXAutocomplete {
  constructor(element: Element | string, options?: UXAutocompleteOptions);
  open(): void;
  close(): void;
  select(item: unknown): void;
  setItems(items: unknown[]): void;
  clear(): void;
  destroy(): void;
}

export interface UXTagInputOptions {
  tags?: string[];
  maxTags?: number;
  allowDuplicates?: boolean;
  delimiter?: string;
}

export class UXTagInput {
  constructor(element: Element | string, options?: UXTagInputOptions);
  readonly tags: string[];
  readonly value: string;
  addTag(tag: string): boolean;
  removeTag(index: number): boolean;
  removeTagByValue(tag: string): boolean;
  setTags(tags: string[]): void;
  clear(): void;
  focus(): void;
  destroy(): void;
}

export interface UXUploadOptions {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}

export class UXUpload {
  constructor(element: Element | string, options?: UXUploadOptions);
  clear(): void;
  getFiles(): File[];
  setDisabled(disabled: boolean): void;
  destroy(): void;
}

export interface UXQuantityStepperOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export class UXQuantityStepper {
  constructor(element: Element | string, options?: UXQuantityStepperOptions);
  get value(): number;
  set value(val: number);
  increment(): void;
  decrement(): void;
  setValue(value: number): void;
  destroy(): void;
}

export interface UXSignaturePadOptions {
  lineWidth?: number;
  lineColor?: string;
  backgroundColor?: string;
}

export class UXSignaturePad {
  constructor(element: Element | string, options?: UXSignaturePadOptions);
  clear(): void;
  undo(): void;
  download(filename?: string): void;
  getSignature(format?: 'png' | 'jpeg'): string;
  loadSignature(dataUrl: string): void;
  isEmpty(): boolean;
  destroy(): void;
}

export interface UXHelpers {
  lockScroll(): void;
  unlockScroll(): void;
  forceUnlockScroll(): void;
  trapFocus(element: Element): () => void;
  setState(element: Element | string, state: string): void;
  getState(element: Element | string): string | undefined;
  hasState(element: Element | string, state: string): boolean;
  dispatch(element: Element | string, name: string, detail?: Record<string, unknown>): void;
  onClickOutside(element: Element, callback: (event: MouseEvent) => void): () => void;
  onEscape(handler: (event: KeyboardEvent) => void): () => void;
}

export interface UXStatic {
  version: string;
  init(root?: Document | Element | ShadowRoot): void;
  create(type: string, element: Element | string, options?: Record<string, unknown>): unknown;
  get(selector: Element | string): unknown;
  destroy(selector: Element | string): void;
  Modal: typeof UXModal;
  Password: typeof UXPassword;
  Range: typeof UXRange;
  OtpInput: typeof UXOtpInput;
  Autocomplete: typeof UXAutocomplete;
  TagInput: typeof UXTagInput;
  Upload: typeof UXUpload;
  QuantityStepper: typeof UXQuantityStepper;
  SignaturePad: typeof UXSignaturePad;
  helpers: UXHelpers;
}

declare const UX: UXStatic;

export { UX };
export default UX;

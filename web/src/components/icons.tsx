type IconProps = React.SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 3h-.9A2.7 2.7 0 0 0 3 5.7C3 14.15 9.85 21 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-.9a1.2 1.2 0 0 0-.82-1.14l-3.4-1.13a1.2 1.2 0 0 0-1.3.4l-.86 1.07a13.6 13.6 0 0 1-5.92-5.92l1.07-.86a1.2 1.2 0 0 0 .4-1.3L7.74 3.82A1.2 1.2 0 0 0 6.6 3Z" />
  </Base>
);

export const LineIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.4c-5.4 0-9.8 3.55-9.8 7.92 0 3.92 3.49 7.2 8.2 7.81.32.07.75.21.86.48.1.25.07.63.03.88l-.14.83c-.04.25-.2.96.85.53 1.05-.44 5.64-3.32 7.7-5.69 1.42-1.55 2.1-3.14 2.1-4.84 0-4.37-4.4-7.92-9.8-7.92Zm-3.9 10.5H6.16a.52.52 0 0 1-.52-.51V8.5a.52.52 0 0 1 1.03 0v3.37H8.1a.52.52 0 0 1 0 1.03Zm2.02-.51a.52.52 0 0 1-1.03 0V8.5a.52.52 0 0 1 1.03 0v3.89Zm4.68 0a.52.52 0 0 1-.93.31l-2-2.7v2.39a.52.52 0 0 1-1.03 0V8.5a.52.52 0 0 1 .93-.31l2 2.71V8.5a.52.52 0 0 1 1.03 0v3.89Zm3.14-2.46a.52.52 0 0 1 0 1.03h-1.42v.91h1.42a.52.52 0 0 1 0 1.03h-1.94a.52.52 0 0 1-.51-.51V8.5a.52.52 0 0 1 .51-.52h1.94a.52.52 0 0 1 0 1.04h-1.42v.91h1.42Z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <Base strokeWidth={2.25} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.9 7.5 9 4.3-1.1 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const ArrowIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ChevronIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 10 4 4 4-4" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Base>
);

export const DocIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4" />
  </Base>
);

export const ToolIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 6.5a4 4 0 0 0 5.2 5.2l-7.8 7.8a2.5 2.5 0 0 1-3.5-3.5l7.8-7.8a4 4 0 0 0-5.2-5.2" />
  </Base>
);

export const SofaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path d="M4 11a2 2 0 0 0-2 2v3h20v-3a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1H6v-1a2 2 0 0 0-2-2Z" />
    <path d="M5 19v-3M19 19v-3" />
  </Base>
);

export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.5Z" />
    <path d="M9.5 20.5v-6h5v6" />
  </Base>
);

export const ExternalIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 5h5v5M19 5l-8 8" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </Base>
);

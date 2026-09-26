const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

/**
 * Shared button used across the site.
 * `as="a"` renders an anchor tag styled the same way, for links like
 * "View resume" or social profiles.
 */
export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  ...props
}) {
  const Component = as
  return (
    <Component className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  )
}

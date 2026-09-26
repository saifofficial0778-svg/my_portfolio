const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

/**
 * Shared button used across the site.
 * `as="a"` renders an anchor tag styled the same way, for links like
 * "View resume" or social profiles.
 *
 * Defaults to type="button" when rendered as a real <button> so it never
 * accidentally submits a surrounding <form> — pass type="submit" explicitly
 * where that's actually intended (see Contact's submit button).
 */
export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  type,
  ...props
}) {
  const Component = as
  const resolvedType = as === 'button' ? type || 'button' : type

  return (
    <Component className={`${variants[variant]} ${className}`} type={resolvedType} {...props}>
      {children}
    </Component>
  )
}

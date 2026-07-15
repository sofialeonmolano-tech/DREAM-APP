/* @ds-bundle: {"format":4,"namespace":"AintsDreamDesignSystem_cb18b1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"55afb243640c","components/core/Button.jsx":"45a844c3c23a","components/core/Card.jsx":"29e86ab6e527","components/core/IconButton.jsx":"f6566b972cc3","components/core/Tag.jsx":"0eece0f01766","components/feedback/Dialog.jsx":"2834927fccf4","components/feedback/Toast.jsx":"0776295b22e2","components/feedback/Tooltip.jsx":"33d84e7a35a5","components/forms/Checkbox.jsx":"85ff1918b0ea","components/forms/Input.jsx":"3ec4a192b467","components/forms/Radio.jsx":"b37e288c2a88","components/forms/Select.jsx":"111832598b4f","components/forms/Switch.jsx":"1343cfe568b5","components/navigation/Tabs.jsx":"7ab29215f34f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AintsDreamDesignSystem_cb18b1 = window.AintsDreamDesignSystem_cb18b1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  color = 'lavender'
}) {
  const colors = {
    lavender: {
      bg: 'var(--lavender-200)',
      fg: 'var(--brown-900)'
    },
    pink: {
      bg: 'var(--pink-200)',
      fg: 'var(--brown-900)'
    },
    yellow: {
      bg: 'var(--yellow-200)',
      fg: 'var(--brown-900)'
    },
    ink: {
      bg: 'var(--brown-700)',
      fg: 'var(--yellow-50)'
    }
  };
  const c = colors[color];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: c.bg,
      color: c.fg,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-xs)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) {
  const paddings = {
    sm: '8px 14px',
    md: '11px 20px',
    lg: '14px 26px'
  };
  const fontSizes = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)',
    lg: 'var(--text-lg)'
  };
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: fontSizes[size],
    padding: paddings[size],
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform 0.12s ease, background 0.15s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };
  const variants = {
    primary: {
      background: 'var(--accent-primary)',
      color: 'var(--brown-900)'
    },
    secondary: {
      background: 'var(--accent-secondary)',
      color: 'var(--brown-900)'
    },
    tertiary: {
      background: 'var(--accent-tertiary)',
      color: 'var(--brown-900)'
    },
    ink: {
      background: 'var(--accent-ink)',
      color: 'var(--yellow-50)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--brown-700)',
      border: '1.5px solid var(--border-default)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant]
    },
    disabled: disabled,
    onClick: onClick,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.96)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = 'var(--space-6)',
  tint
}) {
  const tints = {
    pink: 'var(--pink-50)',
    yellow: 'var(--yellow-50)',
    lavender: 'var(--lavender-50)',
    none: 'var(--surface-card)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: tints[tint] || tints.none,
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding,
      border: '1px solid var(--border-subtle)'
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  children,
  variant = 'ghost',
  size = 40,
  disabled = false,
  onClick,
  label
}) {
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--brown-700)'
    },
    filled: {
      background: 'var(--lavender-100)',
      color: 'var(--brown-800)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    onClick: onClick,
    disabled: disabled,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background 0.15s ease',
      ...variants[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'var(--surface-sunken)',
      color: 'var(--brown-700)',
      border: '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      padding: '5px 10px 5px 12px',
      borderRadius: 'var(--radius-pill)'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--brown-500)',
      fontSize: '13px',
      lineHeight: 1,
      padding: 0
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(55,34,24,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-8)',
      maxWidth: 420,
      width: '90%',
      fontFamily: 'var(--font-body)'
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-2xl)',
      margin: '0 0 12px',
      color: 'var(--brown-900)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--brown-700)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)'
    }
  }, children)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  message,
  tone = 'lavender',
  onDismiss
}) {
  const tones = {
    lavender: 'var(--lavender-200)',
    pink: 'var(--pink-200)',
    yellow: 'var(--yellow-200)',
    ink: 'var(--brown-700)'
  };
  const color = tone === 'ink' ? 'var(--yellow-50)' : 'var(--brown-900)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      background: tones[tone],
      color,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      padding: '12px 18px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", null, message), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color,
      opacity: 0.6
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  children,
  label,
  position = 'top'
}) {
  const [show, setShow] = useState(false);
  const positions = {
    top: {
      bottom: '125%',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: '125%',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...positions[position],
      whiteSpace: 'nowrap',
      background: 'var(--brown-900)',
      color: 'var(--yellow-50)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '7px',
      border: checked ? 'none' : '1.5px solid var(--border-strong)',
      background: checked ? 'var(--accent-primary)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.15s ease'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brown-900)',
      fontSize: '13px',
      fontWeight: 700
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--brown-900)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--brown-700)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-default)',
      background: '#fff',
      color: 'var(--brown-900)',
      outline: 'none',
      opacity: disabled ? 0.5 : 1
    },
    onFocus: e => e.currentTarget.style.boxShadow = 'var(--shadow-focus)',
    onBlur: e => e.currentTarget.style.boxShadow = 'none'
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      border: checked ? '6px solid var(--accent-primary)' : '1.5px solid var(--border-strong)',
      background: '#fff',
      boxSizing: 'border-box',
      transition: 'border 0.15s ease'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--brown-900)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--brown-700)'
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    disabled: disabled,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-default)',
      background: '#fff',
      color: 'var(--brown-900)',
      outline: 'none',
      opacity: disabled ? 0.5 : 1
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled = false,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange({
      target: {
        checked: !checked
      }
    }),
    style: {
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--accent-primary)' : 'var(--brown-200)',
      position: 'relative',
      transition: 'background 0.15s ease',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left 0.15s ease'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--brown-900)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  items = [],
  defaultActive = 0,
  onChange
}) {
  const [active, setActive] = useState(defaultActive);
  const select = i => {
    setActive(i);
    onChange && onChange(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      background: 'var(--surface-sunken)',
      padding: '4px',
      borderRadius: 'var(--radius-pill)',
      width: 'fit-content'
    }
  }, items.map((label, i) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: () => select(i),
    style: {
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)',
      padding: '8px 18px',
      borderRadius: 'var(--radius-pill)',
      background: active === i ? '#fff' : 'transparent',
      color: active === i ? 'var(--brown-900)' : 'var(--brown-500)',
      boxShadow: active === i ? 'var(--shadow-sm)' : 'none',
      transition: 'all 0.15s ease'
    }
  }, label))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();

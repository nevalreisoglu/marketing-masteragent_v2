/* @ds-bundle: {"format":3,"namespace":"EtiyaDesignSystem_c8ff85","components":[],"sourceHashes":{"ui_kits/marketing-suite/Chatbot.jsx":"9a45d9fd2442","ui_kits/marketing-suite/Icons.jsx":"792b87ea1683","ui_kits/marketing-suite/Primitives.jsx":"ce4c33023d23","ui_kits/marketing-suite/Screen1_DigitalTwin.jsx":"d93d5aeb5af5","ui_kits/marketing-suite/Screen2_SignalDetail.jsx":"358560f00771","ui_kits/marketing-suite/Screen3_ECMInbox.jsx":"ced81bcc4f6c","ui_kits/marketing-suite/Screen4_AgenticAI.jsx":"d19f7b013cfd","ui_kits/marketing-suite/Screen5_JourneyCanvas.jsx":"7c48c17b2a5c","ui_kits/marketing-suite/Screen6_Monitoring.jsx":"8a8e82709b08","ui_kits/marketing-suite/Screen7_Wizbot.jsx":"aa6f22c9fe06","ui_kits/marketing-suite/Shell.jsx":"b1d8b1cc527e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EtiyaDesignSystem_c8ff85 = window.EtiyaDesignSystem_c8ff85 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/marketing-suite/Chatbot.jsx
try { (() => {
/* global React, Icon */
const {
  useState,
  useRef,
  useEffect
} = React;
const SCREEN_META = [{
  id: 1,
  key: 'community',
  name: 'Community Console',
  suite: 'Digital Twin',
  desc: 'Browse telco customer communities; review Active Signals'
}, {
  id: 2,
  key: 'signal',
  name: 'Signal Detail',
  suite: 'Digital Twin',
  desc: 'Inspect the Data Overage Risk signal; send to ECM'
}, {
  id: 3,
  key: 'inbox',
  name: 'ECM Signal Inbox',
  suite: 'ECM',
  desc: 'Prioritized signals; create Journey from the top signal'
}, {
  id: 4,
  key: 'agentic',
  name: 'Agentic AI Copilot',
  suite: 'Agentic AI',
  desc: 'Agents draft segment split, offers, delivery config'
}, {
  id: 5,
  key: 'journey',
  name: 'Journey Canvas',
  suite: 'ECM',
  desc: 'Visual journey builder; activate the journey'
}, {
  id: 6,
  key: 'monitoring',
  name: 'Monitoring',
  suite: 'ECM',
  desc: 'Live funnel, segment & channel performance'
}, {
  id: 7,
  key: 'wizbot',
  name: 'Wizbot Insights',
  suite: 'Wizbot',
  desc: 'Chat-based analytics; closed-loop suite'
}];
const SUGGESTIONS = {
  0: ['Show the overage signal', 'Skip to Wizbot insights', 'What is this screen?'],
  1: ['Send this to ECM', 'Go back', 'Explain the projection'],
  2: ['Create journey for top signal', 'Back to Digital Twin', 'Why priority 87?'],
  3: ['Approve & build journey', 'Skip to monitoring', 'Explain High CLV offer'],
  4: ['Activate journey', 'View live monitoring', "What's the control group?"],
  5: ['View full report in Wizbot', 'Restart tour', 'Which segment won?'],
  6: ['Restart the tour', 'Summarize the outcome', 'Suggest next campaign']
};
async function routeMessage(text, currentIdx) {
  const t = text.toLowerCase().trim();
  const rules = [{
    re: /\b(next|ilerle|devam|sonraki)\b/,
    target: currentIdx + 1
  }, {
    re: /\b(back|önceki|geri)\b/,
    target: currentIdx - 1
  }, {
    re: /\b(restart|baştan|tekrar|reset)\b/,
    target: 0
  }, {
    re: /\b(community|communities|console|twin)\b/,
    target: 0
  }, {
    re: /\b(signal detail|overage risk|projection)\b/,
    target: 1
  }, {
    re: /\b(inbox|ecm inbox|prioritization)\b/,
    target: 2
  }, {
    re: /\b(agentic|copilot|ai|agent|segment split|offers)\b/,
    target: 3
  }, {
    re: /\b(journey canvas|journey builder|journey map|canvas|activate)\b/,
    target: 4
  }, {
    re: /\b(monitoring|dashboard|funnel|live)\b/,
    target: 5
  }, {
    re: /\b(wizbot|insights|chat|analytics|closed loop)\b/,
    target: 6
  }, {
    re: /\b(send to ecm)\b/,
    target: 2
  }, {
    re: /\b(create journey)\b/,
    target: 3
  }, {
    re: /\b(approve)\b/,
    target: 4
  }, {
    re: /\b(full report)\b/,
    target: 6
  }];
  for (const r of rules) {
    if (r.re.test(t)) {
      const target = Math.max(0, Math.min(6, r.target));
      return {
        targetIdx: target,
        reply: target === currentIdx ? `You're already on ${SCREEN_META[target].name}.` : `Opening ${SCREEN_META[target].name}.`
      };
    }
  }
  const screenList = SCREEN_META.map((s, i) => `${i}: ${s.name} (${s.suite}) — ${s.desc}`).join('\n');
  try {
    const resp = await window.claude.complete({
      messages: [{
        role: 'user',
        content: `You are a navigation and explanation assistant for a 7-screen telco marketing-suite prototype.
The user is currently on screen ${currentIdx}: ${SCREEN_META[currentIdx].name}.

Screens:
${screenList}

User said: "${text}"

If the user wants to navigate or take an action that maps to a screen, respond as JSON:
{"targetIdx": <0-6>, "reply": "<one short sentence confirmation>"}

If the user is just asking a question about the current screen, respond as JSON:
{"targetIdx": ${currentIdx}, "reply": "<1-2 sentence helpful answer about THIS screen>"}

Return ONLY the JSON, nothing else.`
      }]
    });
    const match = resp.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return {
        targetIdx: Math.max(0, Math.min(6, parseInt(parsed.targetIdx, 10))),
        reply: parsed.reply || 'Got it.'
      };
    }
  } catch (e) {}
  return {
    targetIdx: currentIdx,
    reply: "I'm not sure — try 'next', 'back', or 'go to monitoring'."
  };
}
const Chatbot = ({
  currentIdx,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const [messages, setMessages] = useState([{
    role: 'bot',
    text: `Hi — I'm your Suite Guide. I'll explain this screen and can take you to any of the 7 views. Try "next" or "go to Wizbot".`
  }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, collapsed]);
  const send = async txt => {
    const t = (txt ?? input).trim();
    if (!t || busy) return;
    setInput('');
    setMessages(m => [...m, {
      role: 'user',
      text: t
    }]);
    setBusy(true);
    const {
      targetIdx,
      reply
    } = await routeMessage(t, currentIdx);
    setMessages(m => [...m, {
      role: 'bot',
      text: reply
    }]);
    setBusy(false);
    if (targetIdx !== currentIdx) {
      setTimeout(() => onNavigate(targetIdx), 350);
    }
  };

  // ---- Collapsed: thin rail with chat icon ----
  if (collapsed) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: '100%',
        flexShrink: 0,
        background: '#fff',
        borderLeft: '1px solid #EEF2F7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 0',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onToggleCollapse,
      title: "Open Suite Guide",
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        border: 0,
        background: 'linear-gradient(135deg,#F7941D,#FFB970)',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(247,148,29,0.3)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "message-circle",
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: '#7E8A9A',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        marginTop: 8
      }
    }, "Suite Guide"));
  }
  const current = SCREEN_META[currentIdx];
  const suggestions = SUGGESTIONS[currentIdx] || [];

  // ---- Expanded: fixed right pane ----
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      height: '100%',
      flexShrink: 0,
      background: '#fff',
      borderLeft: '1px solid #EEF2F7',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      borderBottom: '1px solid #EEF2F7',
      background: 'linear-gradient(135deg,#505B79,#3E4660)',
      color: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: 'rgba(255,255,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Suite Guide"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.75
    }
  }, "Navigating: ", current.name)), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleCollapse,
    title: "Collapse",
    style: {
      background: 'transparent',
      border: 0,
      color: '#fff',
      cursor: 'pointer',
      opacity: 0.7,
      padding: 4,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevrons-right",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 14,
      background: '#FAFBFC',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
      maxWidth: '85%',
      background: m.role === 'user' ? '#F7941D' : '#fff',
      color: m.role === 'user' ? '#fff' : '#2B3445',
      fontSize: 12,
      lineHeight: 1.45,
      padding: '8px 12px',
      borderRadius: 10,
      border: m.role === 'user' ? 'none' : '1px solid #EEF2F7',
      boxShadow: m.role === 'user' ? 'none' : '0 1px 2px rgba(40,52,72,0.04)'
    }
  }, m.text)), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      background: '#fff',
      border: '1px solid #EEF2F7',
      borderRadius: 10,
      padding: '8px 12px',
      fontSize: 12,
      color: '#7E8A9A',
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      animation: 'pulse 1.2s infinite'
    }
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    style: {
      animation: 'pulse 1.2s infinite .2s'
    }
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    style: {
      animation: 'pulse 1.2s infinite .4s'
    }
  }, "\u2022"))), suggestions.length > 0 && !busy && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 10px',
      borderTop: '1px solid #EEF2F7',
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      background: '#fff',
      flexShrink: 0
    }
  }, suggestions.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => send(s),
    style: {
      background: '#F8FAFC',
      border: '1px solid #E3E8EF',
      color: '#505B79',
      fontSize: 11,
      padding: '4px 8px',
      borderRadius: 999,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: 10,
      borderTop: '1px solid #EEF2F7',
      background: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') send();
    },
    placeholder: "Ask or say 'next'\u2026",
    style: {
      flex: 1,
      border: '1px solid #E3E8EF',
      borderRadius: 6,
      padding: '6px 10px',
      fontSize: 12,
      fontFamily: 'var(--font-sans)',
      color: '#2B3445',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(),
    disabled: busy,
    style: {
      background: '#62AB47',
      color: '#fff',
      border: 0,
      borderRadius: 6,
      padding: '6px 12px',
      cursor: busy ? 'wait' : 'pointer',
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 12
  }))));
};
window.Chatbot = Chatbot;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Chatbot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Icons.jsx
try { (() => {
/* global React, lucide */
const {
  useEffect,
  useRef
} = React;
const Icon = ({
  name,
  size = 18,
  color,
  strokeWidth = 1.75,
  style
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      color: color || 'currentColor',
      ...style
    }
  });
};
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Primitives.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const {
  useState
} = React;

// ----- Button -----
const Button = ({
  variant = 'primary',
  icon,
  children,
  onClick,
  disabled,
  size = 'md',
  style
}) => {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    border: 0,
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'background 120ms',
    padding: size === 'sm' ? '6px 12px' : '8px 16px',
    fontSize: size === 'sm' ? 12 : 13
  };
  const variants = {
    primary: {
      background: '#62AB47',
      color: '#fff'
    },
    orange: {
      background: '#F7941D',
      color: '#fff'
    },
    slate: {
      background: '#505B79',
      color: '#fff'
    },
    secondary: {
      background: 'transparent',
      color: '#505B79',
      border: '1px solid #C9D2DE'
    },
    ghost: {
      background: 'transparent',
      color: '#62AB47'
    },
    danger: {
      background: '#fff',
      color: '#E5484D',
      border: '1px solid #E5484D'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onClick: onClick,
    disabled: disabled
  }, icon, children);
};

// ----- Card -----
const Card = ({
  title,
  action,
  children,
  style,
  bodyStyle
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    border: '1px solid #EEF2F7',
    borderRadius: 6,
    boxShadow: '0 1px 2px rgba(40,52,72,0.04)',
    ...style
  }
}, title && /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '14px 18px',
    borderBottom: '1px solid #F1F4F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    color: '#62AB47',
    fontSize: 14,
    fontWeight: 600
  }
}, title), action), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 18,
    ...bodyStyle
  }
}, children));

// ----- Pill -----
const Pill = ({
  tone = 'slate',
  children,
  style
}) => {
  const tones = {
    green: {
      bg: '#E4F2DC',
      fg: '#4F9138'
    },
    orange: {
      bg: '#FFE6CC',
      fg: '#B8620A'
    },
    red: {
      bg: '#FCEAEA',
      fg: '#C4393C'
    },
    blue: {
      bg: '#E4EFFB',
      fg: '#2A6FB8'
    },
    slate: {
      bg: '#EEF2F7',
      fg: '#505B79'
    },
    purple: {
      bg: '#EEE4FB',
      fg: '#6D3EB8'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: t.bg,
      color: t.fg,
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      ...style
    }
  }, children);
};

// ----- Badge (HIGH PRIORITY etc) -----
const Badge = ({
  tone = 'green',
  children
}) => {
  const tones = {
    green: '#62AB47',
    red: '#E5484D',
    orange: '#F7941D',
    blue: '#3E8EE8'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: tones[tone],
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      padding: '2px 8px',
      borderRadius: 4
    }
  }, children);
};

// ----- Field -----
const Field = ({
  label,
  required,
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 14,
    ...style
  }
}, label && /*#__PURE__*/React.createElement("label", {
  style: {
    fontSize: 12,
    color: '#62AB47',
    fontWeight: 600,
    display: 'block',
    marginBottom: 4
  }
}, label, required && /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#E5484D',
    marginLeft: 2
  }
}, "*")), children);
const Input = ({
  value,
  placeholder,
  onChange,
  ...rest
}) => /*#__PURE__*/React.createElement("input", _extends({
  value: value ?? '',
  onChange: onChange,
  placeholder: placeholder,
  style: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 10px',
    border: '1px solid #C9D2DE',
    borderRadius: 4,
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    color: '#2B3445',
    background: '#fff'
  }
}, rest));

// ----- Stat (big number + label) -----
const Stat = ({
  label,
  value,
  delta,
  tone
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    padding: '12px 16px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 4
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445',
    lineHeight: 1.1
  }
}, value), delta && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: tone === 'danger' ? '#E5484D' : '#62AB47',
    marginTop: 4
  }
}, delta));

// ----- Live dot -----
const LiveDot = () => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#E5484D',
    boxShadow: '0 0 0 3px rgba(229,72,77,0.2)',
    animation: 'pulse 1.6s ease-in-out infinite'
  }
});
Object.assign(window, {
  Button,
  Card,
  Pill,
  Badge,
  Field,
  Input,
  Stat,
  LiveDot
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen1_DigitalTwin.jsx
try { (() => {
/* global React, Shell, Card, Pill, Badge, Button, Icon, ComponentLabel */
const {
  useState
} = React;
const COMMUNITIES = [{
  id: 'highdata',
  name: 'High Data Usage Youth',
  count: '45,230',
  signals: 2
}, {
  id: 'roaming',
  name: 'Roaming Frequent Travelers',
  count: '12,840',
  signals: 1
}, {
  id: 'dormant',
  name: 'Dormant Prepaid 60+ days',
  count: '28,910',
  signals: 3
}, {
  id: 'network',
  name: 'Network Issue Cluster — Istanbul Kadıköy',
  count: '6,720',
  signals: 1
}, {
  id: 'family',
  name: 'Price-Sensitive Family Plans',
  count: '19,380',
  signals: 0
}, {
  id: 'highvalue',
  name: 'High-Value Postpaid at Risk',
  count: '8,145',
  signals: 2
}, {
  id: 'biz',
  name: 'SMB Mobile First 12 months',
  count: '4,210',
  signals: 0
}, {
  id: 'churn',
  name: 'Churn Risk — Next 30 Days',
  count: '11,450',
  signals: 1
}];

// Small inline sparkline
const Spark = ({
  points,
  color = '#62AB47',
  width = 220,
  height = 60
}) => {
  const max = Math.max(...points),
    min = Math.min(...points);
  const d = points.map((p, i) => {
    const x = i / (points.length - 1) * width;
    const y = height - (p - min) / (max - min || 1) * (height - 6) - 3;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const Screen1_DigitalTwin = ({
  onNext
}) => {
  const [selected, setSelected] = useState('highdata');
  return /*#__PURE__*/React.createElement(Shell, {
    activeComponent: "twin",
    activeNav: "segment",
    breadcrumbs: ['Dashboard', 'Digital Twin', 'Communities']
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(ComponentLabel, {
    component: "twin"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "Community Console")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Communities",
    bodyStyle: {
      padding: 0
    },
    action: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 14,
      color: "#7E8A9A"
    })
  }, COMMUNITIES.map(c => {
    const on = c.id === selected;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: () => setSelected(c.id),
      style: {
        padding: '12px 16px',
        cursor: 'pointer',
        background: on ? '#EEF3FA' : 'transparent',
        borderLeft: on ? '3px solid #62AB47' : '3px solid transparent',
        borderBottom: '1px solid #F1F4F8'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: on ? 600 : 500,
        color: on ? '#2B3445' : '#505B79',
        lineHeight: 1.4
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: '#7E8A9A'
      }
    }, c.count), c.signals > 0 && /*#__PURE__*/React.createElement(Pill, {
      tone: c.signals >= 2 ? 'orange' : 'blue',
      style: {
        fontSize: 10,
        padding: '1px 6px'
      }
    }, c.signals, " signal", c.signals > 1 ? 's' : '')));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px 0',
      fontSize: 20,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "High Data Usage Youth"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#7E8A9A'
    }
  }, "Age 18\u201325 \xB7 Postpaid \xB7 Monthly usage ", '>', "80% of plan limit")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "45,230"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E8A9A',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "members"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      background: '#F8FAFC',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Avg ARPU"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: '#2B3445',
      marginTop: 4
    }
  }, "\u20BA89")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      background: '#F8FAFC',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Avg Monthly Data"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: '#2B3445',
      marginTop: 4
    }
  }, "18.4 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#7E8A9A'
    }
  }, "GB"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      background: '#F8FAFC',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Churn Risk (6mo)"), /*#__PURE__*/React.createElement(Spark, {
    points: [12, 14, 13, 16, 18, 17, 19, 22, 24, 23, 26, 28],
    color: "#F7941D",
    width: 200,
    height: 32
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Active Signals"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onNext,
    style: {
      padding: 14,
      border: '1px solid #FFE6CC',
      borderRadius: 6,
      background: '#FFF9F0',
      marginBottom: 10,
      cursor: 'pointer',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      transition: 'box-shadow 120ms'
    },
    onMouseEnter: e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(247,148,29,0.12)',
    onMouseLeave: e => e.currentTarget.style.boxShadow = 'none'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: '#FFE6CC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#B8620A',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "Data Overage Risk \u2014 Next 10 Days"), /*#__PURE__*/React.createElement(Badge, {
    tone: "orange"
  }, "NEW")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#505B79',
      marginTop: 2
    }
  }, "14,470 members affected \xB7 Detected Oct 6")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    })
  }, "Review")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      border: '1px solid #EEF2F7',
      borderRadius: 6,
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: '#E4EFFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#2A6FB8',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#505B79'
    }
  }, "Upgrade Propensity Rising"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#7E8A9A',
      marginTop: 2
    }
  }, "6,230 members \xB7 Detected Sep 24")))))));
};
window.Screen1_DigitalTwin = Screen1_DigitalTwin;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen1_DigitalTwin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen2_SignalDetail.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Icon, ComponentLabel */

// Overage risk trend with projection
const TrendChart = () => {
  const actual = [52, 55, 51, 54, 58, 56, 60, 63, 65, 68, 72, 75, 78, 82, 85, 88];
  const proj = [88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128];
  const width = 780,
    height = 220;
  const all = [...actual, ...proj];
  const max = Math.max(...all),
    min = 40;
  const yFor = v => height - (v - min) / (max - min) * (height - 30) - 15;
  const xFor = (i, total) => 30 + i / (total - 1) * (width - 40);
  const N = actual.length + proj.length - 1;
  const pathActual = actual.map((v, i) => `${i === 0 ? 'M' : 'L'}${xFor(i, N + 1).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');
  const startProjX = xFor(actual.length - 1, N + 1);
  const pathProj = proj.map((v, i) => `${i === 0 ? 'M' : 'L'}${xFor(actual.length - 1 + i, N + 1).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');

  // area under actual
  const areaD = actual.map((v, i) => `${i === 0 ? 'M' : 'L'}${xFor(i, N + 1).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ') + ` L${xFor(actual.length - 1, N + 1).toFixed(1)},${(height - 15).toFixed(1)}` + ` L${xFor(0, N + 1).toFixed(1)},${(height - 15).toFixed(1)} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: {
      display: 'block'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "30",
    x2: width - 10,
    y1: 15 + i * ((height - 30) / 3),
    y2: 15 + i * ((height - 30) / 3),
    stroke: "#F1F4F8",
    strokeWidth: "1"
  })), [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: "8",
    y: 20 + i * ((height - 30) / 3),
    fontSize: "10",
    fill: "#A6AEBD"
  }, Math.round(max - i * (max - min) / 3), "%")), /*#__PURE__*/React.createElement("path", {
    d: areaD,
    fill: "url(#g)",
    opacity: "0.35"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "g",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#F7941D",
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#F7941D",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: pathActual,
    fill: "none",
    stroke: "#F7941D",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: pathProj,
    fill: "none",
    stroke: "#F7941D",
    strokeWidth: "2",
    strokeDasharray: "5 4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: startProjX,
    x2: startProjX,
    y1: "15",
    y2: height - 15,
    stroke: "#C9D2DE",
    strokeWidth: "1",
    strokeDasharray: "2 2"
  }), /*#__PURE__*/React.createElement("text", {
    x: startProjX + 4,
    y: "24",
    fontSize: "10",
    fill: "#505B79",
    fontWeight: "600"
  }, "Today \xB7 Oct 20"), /*#__PURE__*/React.createElement("text", {
    x: width - 85,
    y: "24",
    fontSize: "10",
    fill: "#B8620A",
    fontWeight: "600"
  }, "Projected"));
};
const Screen2_SignalDetail = ({
  onNext,
  onBack
}) => /*#__PURE__*/React.createElement(Shell, {
  activeComponent: "twin",
  activeNav: "segment",
  breadcrumbs: ['Dashboard', 'Digital Twin', 'Communities', 'Signal Detail']
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "ghost",
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }),
  onClick: onBack,
  size: "sm"
}, "Back"), /*#__PURE__*/React.createElement(ComponentLabel, {
  component: "twin"
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: '#FFE6CC',
    color: '#B8620A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "trending-up",
  size: 22
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4
  }
}, /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445'
  }
}, "Data Overage Risk \u2014 Next 10 Days"), /*#__PURE__*/React.createElement(Pill, {
  tone: "orange"
}, "High priority"), /*#__PURE__*/React.createElement(Pill, {
  tone: "blue"
}, "Community \xB7 High Data Usage Youth")), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 13,
    color: '#505B79',
    maxWidth: 760,
    lineHeight: 1.55
  }
}, "Detected abnormal data usage increase in 32% of community members in the past 14 days. If the current trend continues, 60% of the community will exceed their plan limit by month-end, triggering overage charges."))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 260px',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(Card, {
  title: "Community-level data usage (last 30 days + projection)"
}, /*#__PURE__*/React.createElement(TrendChart, null)), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(Card, {
  title: "Impact"
}, [['Affected customers', '14,470'], ['Anomaly start', 'Oct 6, 2026'], ['Projected overage events', '~8,200'], ['Potential overage revenue', '₺1.2M'], ['NPS / call center risk', 'High']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
  key: k,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    padding: '6px 0',
    borderBottom: '1px solid #F1F4F8'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#7E8A9A'
  }
}, k), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#2B3445',
    fontWeight: 600
  }
}, v)))))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 18
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "secondary"
}, "Dismiss"), /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 14
  }),
  onClick: onNext
}, "Send to ECM")));
window.Screen2_SignalDetail = Screen2_SignalDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen2_SignalDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen3_ECMInbox.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Badge, Icon, ComponentLabel */
const {
  useState
} = React;
const SIGNALS = [{
  id: 's1',
  title: 'Data Overage Risk',
  source: 'Digital Twin',
  count: '14,470',
  priority: 'High',
  score: 87,
  active: true
}, {
  id: 's2',
  title: 'Upgrade Propensity Rising',
  source: 'Digital Twin',
  count: '6,230',
  priority: 'Med',
  score: 62
}, {
  id: 's3',
  title: 'Roaming Anomaly — Europe',
  source: 'Digital Twin',
  count: '2,140',
  priority: 'Med',
  score: 58
}, {
  id: 's4',
  title: 'Churn Window — 7 days',
  source: 'CDP',
  count: '11,450',
  priority: 'High',
  score: 79
}, {
  id: 's5',
  title: 'Winback Opportunity — Prepaid',
  source: 'CDP',
  count: '28,910',
  priority: 'Low',
  score: 41
}];
const CheckRow = ({
  label,
  pass,
  detail
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    borderBottom: '1px solid #F1F4F8'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: pass ? '#E4F2DC' : '#FCEAEA',
    color: pass ? '#4F9138' : '#C4393C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: pass ? 'check' : 'x',
  size: 12,
  strokeWidth: 2.5
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    fontSize: 12,
    color: '#505B79'
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: '#2B3445',
    fontWeight: 600
  }
}, detail));
const Screen3_ECMInbox = ({
  onNext
}) => {
  const [selected, setSelected] = useState('s1');
  return /*#__PURE__*/React.createElement(Shell, {
    activeComponent: "ecm",
    activeNav: "inbox",
    breadcrumbs: ['Dashboard', 'Signal Inbox']
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(ComponentLabel, {
    component: "ecm",
    icon: "inbox"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "Signal Inbox"), /*#__PURE__*/React.createElement(Pill, {
    tone: "green",
    style: {
      marginLeft: 4
    }
  }, "Prioritization Engine")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Incoming signals",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: '#7E8A9A'
      }
    }, "5 active"),
    bodyStyle: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Priority', 'Signal', 'Source', 'Customers', 'Score', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      background: '#F8FAFC',
      color: '#7E8A9A',
      fontWeight: 600,
      textAlign: 'left',
      padding: '10px 14px',
      borderBottom: '1px solid #E3E8EF',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, SIGNALS.map(s => {
    const on = s.id === selected;
    return /*#__PURE__*/React.createElement("tr", {
      key: s.id,
      onClick: () => setSelected(s.id),
      style: {
        cursor: 'pointer',
        background: on ? '#EEF3FA' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8'
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      tone: s.priority === 'High' ? 'red' : s.priority === 'Med' ? 'orange' : 'slate'
    }, s.priority)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8',
        color: '#2B3445',
        fontWeight: on ? 600 : 500
      }
    }, s.title, s.active && /*#__PURE__*/React.createElement(Badge, {
      tone: "orange"
    }, "NEW")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8',
        color: '#7E8A9A'
      }
    }, s.source), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8',
        color: '#2B3445',
        fontWeight: 600
      }
    }, s.count), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8',
        color: '#62AB47',
        fontWeight: 600
      }
    }, s.score, "/100"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        borderBottom: '1px solid #F1F4F8'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 14,
      color: "#A6AEBD"
    })));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Data Overage Risk"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Prioritization"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 600,
      color: '#62AB47',
      lineHeight: 1
    }
  }, "87", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#A6AEBD'
    }
  }, "/100"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: '#F1F4F8',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '87%',
      height: '100%',
      background: 'linear-gradient(90deg,#62AB47,#8FCB6F)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E8A9A',
      marginTop: 6
    }
  }, "Recommended journey start: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#2B3445'
    }
  }, "Within 24 hours")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 4
    }
  }, "Checks"), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Conflict check \u2014 active campaigns",
    pass: true,
    detail: "No conflicts"
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Pressure rules",
    pass: true,
    detail: "Compliant"
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Consent",
    pass: true,
    detail: "13,920 of 14,470"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7E8A9A'
    }
  }, "Suggested template"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#2B3445',
      fontWeight: 600
    }
  }, "Twin-Triggered Proactive"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    style: {
      flex: 1
    }
  }, "Hold for Review"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      flex: 1
    },
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }),
    onClick: onNext
  }, "Create Journey")))));
};
window.Screen3_ECMInbox = Screen3_ECMInbox;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen3_ECMInbox.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen4_AgenticAI.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Badge, Icon, ComponentLabel */

const AgentHeader = ({
  name,
  role
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 22,
    height: 22,
    borderRadius: 5,
    background: 'linear-gradient(135deg,#6D3EB8,#9B6FE0)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "sparkles",
  size: 12,
  strokeWidth: 2.2
})), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: '#7E8A9A'
  }
}, "by ", /*#__PURE__*/React.createElement("strong", {
  style: {
    color: '#2B3445'
  }
}, name), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#A6AEBD',
    marginLeft: 6
  }
}, "\xB7 ", role)));
const SEGMENTS = [{
  tier: 'Low CLV',
  count: '4,048',
  pct: '28%',
  arpu: '₺52',
  color: '#A6AEBD',
  offer: '1 GB Bonus Data',
  acc: '22%',
  impact: 'Retention-focused'
}, {
  tier: 'Mid CLV',
  count: '7,380',
  pct: '51%',
  arpu: '₺87',
  color: '#3E8EE8',
  offer: 'Upgrade to next tier (20% off 3 months)',
  acc: '31%',
  impact: '+₺18/user ARPU'
}, {
  tier: 'High CLV',
  count: '3,042',
  pct: '21%',
  arpu: '₺148',
  color: '#62AB47',
  offer: 'Personalized upgrade + 500 loyalty points',
  acc: '41%',
  impact: '+₺34/user ARPU'
}];
const Screen4_AgenticAI = ({
  onNext
}) => /*#__PURE__*/React.createElement(Shell, {
  activeComponent: "ai",
  activeNav: "campaign",
  breadcrumbs: ['Dashboard', 'Signal Inbox', 'Agentic AI Copilot']
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6
  }
}, /*#__PURE__*/React.createElement(ComponentLabel, {
  component: "ai"
}), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445'
  }
}, "Agentic AI Copilot"), /*#__PURE__*/React.createElement(Pill, {
  tone: "purple"
}, "Data Overage Risk \xB7 14,470 customers")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 12,
    color: '#7E8A9A',
    marginTop: 4,
    marginBottom: 18
  }
}, "Agents have drafted a campaign plan. Review, edit, and approve to build the journey in ECM."), /*#__PURE__*/React.createElement(Card, {
  title: "Recommended Customer Split",
  style: {
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement(AgentHeader, {
  name: "Segmentation + CLV Agent",
  role: "splits by predicted lifetime value"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 14
  }
}, SEGMENTS.map(s => /*#__PURE__*/React.createElement("div", {
  key: s.tier,
  style: {
    padding: 14,
    border: '1px solid #EEF2F7',
    borderRadius: 6,
    background: '#F8FAFC'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: s.color
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12,
    color: '#505B79',
    fontWeight: 600
  }
}, s.tier), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#A6AEBD',
    marginLeft: 'auto'
  }
}, s.pct)), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445'
  }
}, s.count), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: '#7E8A9A',
    marginTop: 2
  }
}, "customers \xB7 avg ARPU ", s.arpu))))), /*#__PURE__*/React.createElement(Card, {
  title: "Recommended Offers per Segment",
  style: {
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement(AgentHeader, {
  name: "Strategy Agent",
  role: "matches offer to segment elasticity"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 14
  }
}, SEGMENTS.map(s => /*#__PURE__*/React.createElement("div", {
  key: s.tier,
  style: {
    padding: 14,
    border: '1px solid #EEF2F7',
    borderRadius: 6
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: s.color
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    fontWeight: 600
  }
}, s.tier), /*#__PURE__*/React.createElement("span", {
  style: {
    marginLeft: 'auto',
    fontSize: 11,
    color: '#62AB47',
    cursor: 'pointer'
  }
}, "Edit")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    color: '#2B3445',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: 10
  }
}, s.offer), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#7E8A9A'
  }
}, "Est. acceptance"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#62AB47',
    fontWeight: 600
  }
}, s.acc)), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    marginTop: 4
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#7E8A9A'
  }
}, "Impact"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#2B3445',
    fontWeight: 600
  }
}, s.impact)))))), /*#__PURE__*/React.createElement(Card, {
  title: "Delivery Configuration"
}, /*#__PURE__*/React.createElement(AgentHeader, {
  name: "Delivery Configuration Agent",
  role: "picks channel mix, pacing, guardrails"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 24
  }
}, [[['Channel mix', 'App Push (primary) → SMS (24h fallback)'], ['Send time', 'Optimized per user (STO enabled)'], ['Control group', '10%']], [['Pressure rules', 'Applied (max 2 msg/customer/week)'], ['Journey waves', '3 (day 0, day 3, day 7)'], ['Consent', '13,920 of 14,470 eligible']], [['Estimated reach', '12,892 customers (after splits)'], ['Projected conversions', '~2,830'], ['Projected recovery', '₺890K']]].map((col, ci) => /*#__PURE__*/React.createElement("div", {
  key: ci
}, col.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
  key: k,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    padding: '7px 0',
    borderBottom: '1px solid #F1F4F8'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#7E8A9A'
  }
}, k), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#2B3445',
    fontWeight: 600,
    textAlign: 'right'
  }
}, v))))))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 18
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "secondary",
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "sliders-horizontal",
    size: 14
  })
}, "Customize"), /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }),
  onClick: onNext
}, "Approve & Build Journey")));
window.Screen4_AgenticAI = Screen4_AgenticAI;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen4_AgenticAI.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen5_JourneyCanvas.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Icon, ComponentLabel */

const Node = ({
  type,
  title,
  subtitle,
  children,
  style
}) => {
  const colors = {
    trigger: {
      bg: '#FFF4E6',
      fg: '#B8620A',
      border: '#FFE6CC',
      ico: 'zap'
    },
    split: {
      bg: '#EEE4FB',
      fg: '#6D3EB8',
      border: '#DCC8F5',
      ico: 'split'
    },
    delivery: {
      bg: '#E4EFFB',
      fg: '#2A6FB8',
      border: '#C6DDF7',
      ico: 'send'
    },
    timer: {
      bg: '#FFF4D6',
      fg: '#B8860A',
      border: '#F5E3A8',
      ico: 'clock'
    },
    decision: {
      bg: '#DFF6EF',
      fg: '#1F9B7B',
      border: '#B8E6D4',
      ico: 'help-circle'
    },
    exit: {
      bg: '#F8FAFC',
      fg: '#7E8A9A',
      border: '#E3E8EF',
      ico: 'log-out'
    },
    control: {
      bg: '#FCEAEA',
      fg: '#C4393C',
      border: '#F5CCCE',
      ico: 'shield'
    }
  };
  const c = colors[type];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      padding: '8px 10px',
      minWidth: 160,
      boxShadow: '0 1px 3px rgba(40,52,72,0.08)',
      fontSize: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: c.bg,
      color: c.fg,
      padding: '2px 7px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.ico,
    size: 11,
    strokeWidth: 2.2
  }), type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#2B3445',
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E8A9A',
      marginTop: 2
    }
  }, subtitle), children);
};
const Arrow = ({
  w = 24
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: w,
    height: 1,
    background: '#C9D2DE',
    position: 'relative',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    right: -4,
    top: -3,
    width: 0,
    height: 0,
    borderLeft: '5px solid #C9D2DE',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent'
  }
}));
const Lane = ({
  label,
  color,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    border: '1px dashed #E3E8EF',
    borderRadius: 6,
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.5)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: color,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 10
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 0
  }
}, children));
const Screen5_JourneyCanvas = ({
  onNext
}) => /*#__PURE__*/React.createElement(Shell, {
  activeComponent: "ecm",
  activeNav: "journey",
  breadcrumbs: ['Dashboard', 'Journey Builder', 'Data Overage Prevention']
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement(ComponentLabel, {
  component: "ecm",
  icon: "git-branch"
}), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445'
  }
}, "Data Overage Prevention"), /*#__PURE__*/React.createElement(Pill, {
  tone: "green"
}, "Ready to Activate"), /*#__PURE__*/React.createElement(Pill, {
  tone: "slate",
  style: {
    marginLeft: 'auto'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "shield",
  size: 11
}), " Consent & Pressure Rules: Active"), /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 14
  }),
  onClick: onNext
}, "Activate Journey")), /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'linear-gradient(#FAFBFC,#F0F5FB)',
    backgroundImage: 'linear-gradient(#E3E8EF 1px, transparent 1px), linear-gradient(90deg, #E3E8EF 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    backgroundColor: '#FAFBFC',
    border: '1px solid #EEF2F7',
    borderRadius: 8,
    padding: 20,
    overflowX: 'auto'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    marginBottom: 16,
    minWidth: 1200
  }
}, /*#__PURE__*/React.createElement(Node, {
  type: "trigger",
  title: "Data Overage Risk",
  subtitle: "Digital Twin signal \xB7 14,470 customers"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "split",
  title: "Segment Split",
  subtitle: "By CLV \xB7 3 ways"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(Lane, {
  label: "Low CLV \xB7 4,048",
  color: "#A6AEBD"
}, /*#__PURE__*/React.createElement(Node, {
  type: "delivery",
  title: "Wave 1: Awareness",
  subtitle: "App Push \xB7 +1 GB bonus"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "timer",
  title: "Wait 3 days"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "decision",
  title: "Responded?"
})), /*#__PURE__*/React.createElement(Lane, {
  label: "Mid CLV \xB7 7,380",
  color: "#3E8EE8"
}, /*#__PURE__*/React.createElement(Node, {
  type: "delivery",
  title: "Wave 1: Awareness",
  subtitle: "App Push \xB7 upgrade -20%"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "timer",
  title: "Wait 3 days"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "decision",
  title: "Responded?"
})), /*#__PURE__*/React.createElement(Lane, {
  label: "High CLV \xB7 3,042",
  color: "#62AB47"
}, /*#__PURE__*/React.createElement(Node, {
  type: "delivery",
  title: "Wave 1: Awareness",
  subtitle: "App Push \xB7 upgrade + points"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "timer",
  title: "Wait 3 days"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "decision",
  title: "Responded?"
})))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    marginLeft: 280,
    minWidth: 920
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    marginRight: 10
  }
}, "No \u2192"), /*#__PURE__*/React.createElement(Node, {
  type: "delivery",
  title: "Wave 2: Stronger Offer",
  subtitle: "SMS fallback"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "timer",
  title: "Wait 3 days"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "decision",
  title: "Approaching limit?"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "delivery",
  title: "Wave 3: Last Chance",
  subtitle: "SMS \xB7 quick upgrade link"
}), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(Node, {
  type: "exit",
  title: "Exit"
})), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 18,
    paddingTop: 14,
    borderTop: '1px dashed #E3E8EF',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(Node, {
  type: "control",
  title: "Control Group \xB7 10%",
  subtitle: "Holdout \xB7 no treatment \xB7 measurement only",
  style: {
    minWidth: 240
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    fontStyle: 'italic'
  }
}, "Separated from main flow \xB7 used for lift measurement in monitoring"))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 14,
    marginTop: 14,
    flexWrap: 'wrap',
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
}, "Palette"), ['trigger', 'split', 'delivery', 'timer', 'decision', 'control'].map(t => /*#__PURE__*/React.createElement("div", {
  key: t,
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    color: '#505B79'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 10,
    height: 10,
    borderRadius: 3,
    background: {
      trigger: '#F7941D',
      split: '#6D3EB8',
      delivery: '#3E8EE8',
      timer: '#F5B82E',
      decision: '#2EC4A0',
      control: '#E5484D'
    }[t]
  }
}), t))));
window.Screen5_JourneyCanvas = Screen5_JourneyCanvas;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen5_JourneyCanvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen6_Monitoring.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Icon, LiveDot, ComponentLabel */

const Funnel = () => {
  const stages = [{
    name: 'Entered Wave 1',
    count: 12892,
    pct: 100
  }, {
    name: 'Responded to Wave 1',
    count: 3120,
    pct: 24
  }, {
    name: 'Wave 2 delivered',
    count: 9772,
    pct: 76
  }, {
    name: 'Wave 3 delivered',
    count: 5180,
    pct: 40
  }, {
    name: 'Converted',
    count: 2134,
    pct: 17
  }];
  const maxPct = 100;
  return /*#__PURE__*/React.createElement("div", null, stages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#505B79',
      fontWeight: 500
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#2B3445',
      fontWeight: 600
    }
  }, s.count.toLocaleString(), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7E8A9A',
      fontWeight: 400
    }
  }, "(", s.pct, "%)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      background: '#F1F4F8',
      borderRadius: 5,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${s.pct / maxPct * 100}%`,
      height: '100%',
      background: i === stages.length - 1 ? '#62AB47' : '#3E8EE8',
      transition: 'width 400ms'
    }
  })))));
};
const SegmentBars = () => {
  const data = [{
    label: 'Low CLV',
    val: 19,
    color: '#A6AEBD'
  }, {
    label: 'Mid CLV',
    val: 33,
    color: '#3E8EE8'
  }, {
    label: 'High CLV',
    val: 41,
    color: '#62AB47'
  }];
  const max = 50;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 24,
      height: 160,
      padding: '10px 0'
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    style: {
      flex: 1,
      textAlign: 'center',
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      height: `${d.val / max * 120}px`,
      background: d.color,
      borderRadius: '4px 4px 0 0',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 6,
      color: '#fff',
      fontSize: 12,
      fontWeight: 600
    }
  }, d.val, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: 11,
      color: '#505B79'
    }
  }, d.label))));
};
const ChannelRow = ({
  channel,
  icon,
  delivery,
  open,
  ctr
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr 1fr 1fr',
    gap: 12,
    padding: '10px 0',
    borderBottom: '1px solid #F1F4F8',
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    color: '#2B3445',
    fontWeight: 600
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: icon,
  size: 14
}), " ", channel), [delivery, open, ctr].map((v, i) => /*#__PURE__*/React.createElement("div", {
  key: i
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    marginBottom: 3
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#7E8A9A'
  }
}, ['Delivery', 'Open', 'CTR'][i]), /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#2B3445',
    fontWeight: 600
  }
}, v, "%")), /*#__PURE__*/React.createElement("div", {
  style: {
    height: 4,
    background: '#F1F4F8',
    borderRadius: 2
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: `${v}%`,
    height: '100%',
    background: '#62AB47',
    borderRadius: 2
  }
})))));
const Screen6_Monitoring = ({
  onNext
}) => /*#__PURE__*/React.createElement(Shell, {
  activeComponent: "ecm",
  activeNav: "operation",
  breadcrumbs: ['Dashboard', 'Journey Builder', 'Data Overage Prevention', 'Monitoring']
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18
  }
}, /*#__PURE__*/React.createElement(ComponentLabel, {
  component: "ecm",
  icon: "activity"
}), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: '#2B3445'
  }
}, "Journey Monitoring"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginLeft: 4
  }
}, /*#__PURE__*/React.createElement(LiveDot, null), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: '#E5484D',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
}, "Live")), /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  style: {
    marginLeft: 'auto'
  },
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 14
  }),
  onClick: onNext
}, "View Full Report in Wizbot")), /*#__PURE__*/React.createElement(Card, {
  style: {
    marginBottom: 14
  },
  bodyStyle: {
    padding: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
}, [['Status', 'Active', 'Day 8 of 14', '#62AB47'], ['Customers in Journey', '12,892', 'after segment split', '#2B3445'], ['Converted', '2,134', '16.6% conversion rate', '#F7941D'], ['Control Group Response', '4.1%', 'measurement baseline', '#7E8A9A']].map(([k, v, sub, color], i) => /*#__PURE__*/React.createElement("div", {
  key: k,
  style: {
    padding: '16px 20px',
    borderRight: i < 3 ? '1px solid #F1F4F8' : 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
}, k), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 22,
    fontWeight: 600,
    color,
    marginTop: 4,
    lineHeight: 1.1
  }
}, v), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    marginTop: 2
  }
}, sub))))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14
  }
}, /*#__PURE__*/React.createElement(Card, {
  title: "Wave Funnel"
}, /*#__PURE__*/React.createElement(Funnel, null)), /*#__PURE__*/React.createElement(Card, {
  title: "Acceptance by Segment"
}, /*#__PURE__*/React.createElement(SegmentBars, null))), /*#__PURE__*/React.createElement(Card, {
  title: "Channel Performance",
  style: {
    marginTop: 14
  }
}, /*#__PURE__*/React.createElement(ChannelRow, {
  channel: "App Push",
  icon: "smartphone",
  delivery: 98,
  open: 42,
  ctr: 14
}), /*#__PURE__*/React.createElement(ChannelRow, {
  channel: "SMS",
  icon: "message-square",
  delivery: 96,
  open: 68,
  ctr: 9
})));
window.Screen6_Monitoring = Screen6_Monitoring;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen6_Monitoring.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Screen7_Wizbot.jsx
try { (() => {
/* global React, Shell, Card, Button, Pill, Icon, ComponentLabel */
const {
  useState,
  useEffect
} = React;
const Bubble = ({
  role,
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 12,
    marginBottom: 18,
    alignItems: 'flex-start',
    ...style
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 30,
    height: 30,
    borderRadius: 6,
    background: role === 'user' ? 'linear-gradient(135deg,#F7941D,#FFB970)' : 'linear-gradient(135deg,#505B79,#7E8A9A)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: role === 'user' ? 'user' : 'sparkles',
  size: 14
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A',
    fontWeight: 600,
    marginBottom: 4
  }
}, role === 'user' ? 'You' : 'Wizbot'), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    color: '#2B3445',
    lineHeight: 1.55
  }
}, children)));
const CompareCard = () => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#F8FAFC',
    border: '1px solid #EEF2F7',
    borderRadius: 6,
    padding: 14,
    marginTop: 10
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 12,
    background: '#fff',
    borderRadius: 4,
    borderLeft: '3px solid #62AB47'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
}, "Test Group"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 28,
    fontWeight: 600,
    color: '#62AB47',
    marginTop: 4
  }
}, "18%"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A'
  }
}, "overage rate")), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 12,
    background: '#fff',
    borderRadius: 4,
    borderLeft: '3px solid #A6AEBD'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
}, "Control Group"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 28,
    fontWeight: 600,
    color: '#505B79',
    marginTop: 4
  }
}, "54%"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: '#7E8A9A'
  }
}, "overage rate"))), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 12,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    fontSize: 12
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600
  }
}, "Lift"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 600,
    color: '#62AB47'
  }
}, "\u221236 pp")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600
  }
}, "Recovered Revenue"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 600,
    color: '#2B3445'
  }
}, "\u20BA890,000")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: '#7E8A9A',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600
  }
}, "Upgrade Acceptance"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 600,
    color: '#2B3445'
  }
}, "34%"))));
const BarChart = () => {
  const data = [{
    label: 'High CLV',
    val: 41,
    color: '#62AB47'
  }, {
    label: 'Mid CLV',
    val: 33,
    color: '#3E8EE8'
  }, {
    label: 'Low CLV',
    val: 19,
    color: '#A6AEBD'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F8FAFC',
      border: '1px solid #EEF2F7',
      borderRadius: 6,
      padding: 14,
      marginTop: 10
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      fontSize: 12,
      color: '#505B79',
      fontWeight: 600
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      background: '#fff',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${d.val * 2}%`,
      height: '100%',
      background: d.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 8,
      color: '#fff',
      fontSize: 11,
      fontWeight: 600
    }
  }, d.val, "%")))));
};
const ClosedLoop = () => {
  const nodes = [{
    id: 'twin',
    label: 'Digital Twin',
    x: 50,
    icon: 'users-round'
  }, {
    id: 'cdp',
    label: 'CDP',
    x: 190,
    icon: 'database'
  }, {
    id: 'ai',
    label: 'Agentic AI',
    x: 330,
    icon: 'sparkles'
  }, {
    id: 'ecm',
    label: 'ECM',
    x: 470,
    icon: 'git-branch'
  }, {
    id: 'wizbot',
    label: 'Wizbot',
    x: 610,
    icon: 'message-circle'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: '18px 20px',
      background: '#FAFBFC',
      border: '1px dashed #E3E8EF',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#7E8A9A',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: 12
    }
  }, "Closed-loop suite"), /*#__PURE__*/React.createElement("svg", {
    width: "720",
    height: "90",
    style: {
      maxWidth: '100%'
    }
  }, nodes.map((n, i) => i < nodes.length - 1 && /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: n.x + 30,
    y1: "45",
    x2: nodes[i + 1].x,
    y2: "45",
    stroke: "#C9D2DE",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${nodes[i + 1].x - 6},42 ${nodes[i + 1].x},45 ${nodes[i + 1].x - 6},48`,
    fill: "#C9D2DE"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M 640 60 Q 640 85 50 85 Q 20 85 20 55",
    fill: "none",
    stroke: "#F7941D",
    strokeWidth: "1.5",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "18,50 23,60 13,60",
    fill: "#F7941D"
  }), nodes.map(n => /*#__PURE__*/React.createElement("g", {
    key: n.id
  }, /*#__PURE__*/React.createElement("circle", {
    cx: n.x + 15,
    cy: 45,
    r: 18,
    fill: "#fff",
    stroke: "#E3E8EF",
    strokeWidth: "1"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: -60,
      position: 'relative',
      maxWidth: 720
    }
  }, nodes.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      display: 'flex',
      alignItems: 'center',
      color: '#505B79'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#505B79',
      fontWeight: 600,
      marginTop: 2
    }
  }, n.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#B8620A',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 6
    }
  }, "Wizbot insights flow back into Digital Twin for the next cycle"));
};
const HISTORY = ['Campaign performance — Black Friday', 'Churn segments — Q3', 'Overage Prevention — Live', 'Roaming uplift — Europe'];
const Screen7_Wizbot = ({
  onRestart
}) => {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    if (shown < 3) {
      const t = setTimeout(() => setShown(s => s + 1), 600);
      return () => clearTimeout(t);
    }
  }, [shown]);
  return /*#__PURE__*/React.createElement(Shell, {
    activeComponent: "wizbot",
    activeNav: "operation",
    breadcrumbs: ['Dashboard', 'Wizbot', 'Overage Prevention']
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(ComponentLabel, {
    component: "wizbot"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      color: '#2B3445'
    }
  }, "Agentic Insights"), /*#__PURE__*/React.createElement(Pill, {
    tone: "purple",
    style: {
      marginLeft: 4
    }
  }, "Data Overage Prevention"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "refresh-ccw",
      size: 14
    }),
    onClick: onRestart,
    style: {
      marginLeft: 'auto'
    }
  }, "Restart tour")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "History",
    bodyStyle: {
      padding: 0
    }
  }, HISTORY.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '10px 14px',
      fontSize: 12,
      color: i === 2 ? '#2B3445' : '#7E8A9A',
      background: i === 2 ? '#EEF3FA' : 'transparent',
      borderLeft: i === 2 ? '3px solid #62AB47' : '3px solid transparent',
      fontWeight: i === 2 ? 600 : 400,
      cursor: 'pointer',
      borderBottom: '1px solid #F1F4F8'
    }
  }, h))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Bubble, {
    role: "user"
  }, "What's the test vs control comparison for Data Overage Risk campaign?"), /*#__PURE__*/React.createElement(Bubble, {
    role: "bot"
  }, "The campaign is significantly outperforming the holdout. Test-group overage rate is ", /*#__PURE__*/React.createElement("strong", null, "18%"), " versus", /*#__PURE__*/React.createElement("strong", null, " 54%"), " in control \u2014 a ", /*#__PURE__*/React.createElement("strong", null, "36-point"), " reduction.", /*#__PURE__*/React.createElement(CompareCard, null)), shown >= 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Bubble, {
    role: "user"
  }, "Which CLV segment had the highest acceptance?"), /*#__PURE__*/React.createElement(Bubble, {
    role: "bot"
  }, /*#__PURE__*/React.createElement("strong", null, "High CLV"), " responded 2.2\xD7 more than Low CLV. Consider increasing offer premium for High CLV in future waves.", /*#__PURE__*/React.createElement(BarChart, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '8px 12px',
      background: '#FFF4E6',
      borderLeft: '3px solid #F7941D',
      fontSize: 12,
      color: '#B8620A'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Insight:"), " High CLV responded 2.2\xD7 more than Low CLV \u2014 consider increasing offer premium for High CLV in future waves."))), shown >= 3 && /*#__PURE__*/React.createElement(Bubble, {
    role: "user"
  }, "Should we run this signal again next month?"), shown >= 3 && /*#__PURE__*/React.createElement(Bubble, {
    role: "bot"
  }, /*#__PURE__*/React.createElement("strong", null, "Yes"), " \u2014 the community still shows elevated data usage trends. I recommend the following adjustments:", /*#__PURE__*/React.createElement("ul", {
    style: {
      marginTop: 8,
      paddingLeft: 18
    }
  }, /*#__PURE__*/React.createElement("li", null, "Shorten wave intervals from 3 days to 2 days \u2014 response plateaus after day 2."), /*#__PURE__*/React.createElement("li", null, "Increase the Low CLV offer \u2014 current acceptance is below benchmark.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '8px 12px',
      background: '#E4F2DC',
      borderLeft: '3px solid #62AB47',
      fontSize: 12,
      color: '#4F9138'
    }
  }, "Estimated lift from these changes: ", /*#__PURE__*/React.createElement("strong", null, "+8%")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right-circle",
      size: 14
    })
  }, "Apply to Next Campaign")), /*#__PURE__*/React.createElement(ClosedLoop, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      gap: 8,
      padding: 10,
      border: '1px solid #E3E8EF',
      borderRadius: 8,
      background: '#F8FAFC'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Ask Wizbot a follow-up\u2026",
    style: {
      flex: 1,
      border: 0,
      background: 'transparent',
      fontSize: 13,
      color: '#2B3445',
      outline: 'none',
      fontFamily: 'var(--font-sans)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 12
    })
  }, "Ask")))));
};
window.Screen7_Wizbot = Screen7_Wizbot;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Screen7_Wizbot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-suite/Shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, Icon */
const {
  useState
} = React;

// ----- Suite navigator — top-right -----
const SUITE = [{
  id: 'cdp',
  name: 'CDP',
  icon: 'database'
}, {
  id: 'twin',
  name: 'Digital Twin',
  icon: 'users-round'
}, {
  id: 'ai',
  name: 'Agentic AI',
  icon: 'sparkles'
}, {
  id: 'ecm',
  name: 'ECM',
  icon: 'git-branch'
}, {
  id: 'wizbot',
  name: 'Wizbot',
  icon: 'message-circle'
}];

// ----- Marketing Suite flow — 7 screens grouped under one menu section -----
const MARKETING_SUITE_FLOW = [{
  idx: 0,
  id: 'ms-community',
  name: 'Community Console',
  icon: 'users-round',
  component: 'twin'
}, {
  idx: 1,
  id: 'ms-signal',
  name: 'Signal Detail',
  icon: 'activity',
  component: 'twin'
}, {
  idx: 2,
  id: 'ms-inbox',
  name: 'Signal Inbox',
  icon: 'inbox',
  component: 'ecm',
  badge: 'NEW'
}, {
  idx: 3,
  id: 'ms-agentic',
  name: 'Agentic Copilot',
  icon: 'sparkles',
  component: 'ai'
}, {
  idx: 4,
  id: 'ms-journey',
  name: 'Journey Canvas',
  icon: 'git-branch',
  component: 'ecm'
}, {
  idx: 5,
  id: 'ms-monitoring',
  name: 'Monitoring',
  icon: 'bar-chart-3',
  component: 'ecm'
}, {
  idx: 6,
  id: 'ms-wizbot',
  name: 'Wizbot Insights',
  icon: 'message-circle',
  component: 'wizbot'
}];
const SuiteNavigator = ({
  active
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: '#F8FAFC',
    border: '1px solid #EEF2F7',
    padding: '4px 8px',
    borderRadius: 999
  }
}, SUITE.map((c, i) => {
  const on = c.id === active;
  return /*#__PURE__*/React.createElement(React.Fragment, {
    key: c.id
  }, /*#__PURE__*/React.createElement("div", {
    title: c.name,
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: on ? '#F7941D' : '#fff',
      color: on ? '#fff' : '#7E8A9A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: on ? 'none' : '1px solid #E3E8EF',
      boxShadow: on ? '0 2px 6px rgba(247,148,29,0.3)' : 'none',
      transition: 'all 150ms'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 14,
    strokeWidth: on ? 2.2 : 1.75
  })), i < SUITE.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 1,
      background: '#E3E8EF'
    }
  }));
}), /*#__PURE__*/React.createElement("div", {
  style: {
    marginLeft: 6,
    fontSize: 11,
    color: '#505B79',
    fontWeight: 600,
    paddingLeft: 8,
    borderLeft: '1px solid #E3E8EF'
  }
}, SUITE.find(c => c.id === active)?.name));

// ----- Top Header -----
const Header = ({
  activeComponent,
  onToggleMenu,
  menuOpen
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    height: 56,
    background: '#fff',
    borderBottom: '1px solid #EEF2F7',
    display: 'flex',
    alignItems: 'center',
    padding: '0 18px',
    gap: 16
  }
}, /*#__PURE__*/React.createElement("button", {
  onClick: onToggleMenu,
  title: "Menu",
  style: {
    width: 34,
    height: 34,
    borderRadius: 6,
    border: '1px solid #EEF2F7',
    background: menuOpen ? '#FFF4E6' : '#fff',
    color: menuOpen ? '#F7941D' : '#505B79',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 120ms'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "menu",
  size: 18
})), /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logos/atya-wordmark.svg",
  style: {
    height: 32
  },
  alt: "Atya"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement(SuiteNavigator, {
  active: activeComponent
}), /*#__PURE__*/React.createElement("div", {
  style: {
    width: 1,
    height: 24,
    background: '#E3E8EF',
    margin: '0 6px'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    border: '1px solid #E3E8EF',
    borderRadius: 4,
    padding: '3px 8px',
    fontSize: 12,
    color: '#505B79'
  }
}, "EN ", /*#__PURE__*/React.createElement(Icon, {
  name: "chevron-down",
  size: 12
})), /*#__PURE__*/React.createElement(Icon, {
  name: "bell",
  size: 18,
  color: "#7E8A9A"
}), /*#__PURE__*/React.createElement(Icon, {
  name: "grid-3x3",
  size: 18,
  color: "#F7941D"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8,
    borderLeft: '1px solid #E3E8EF'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F7941D, #FFB970)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600
  }
}, "NR"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    lineHeight: 1.2
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    color: '#2B3445',
    fontWeight: 600
  }
}, "Nevsel Renozlu"), /*#__PURE__*/React.createElement("div", {
  style: {
    color: '#7E8A9A',
    fontSize: 10
  }
}, "Atya Admin"))));

// ----- Sidebar -----
// Static items always shown
const STATIC_NAV = [{
  section: 'FAVORITES'
}, {
  id: 'dashboard',
  name: 'Dashboard',
  icon: 'layout-dashboard'
}, {
  id: 'operation',
  name: 'Operation Analysis',
  icon: 'bar-chart-3'
}, {
  section: 'USES'
}, {
  id: 'program',
  name: 'Program',
  icon: 'layers'
}, {
  id: 'campaign',
  name: 'Campaign',
  icon: 'megaphone'
}, {
  id: 'content',
  name: 'Content',
  icon: 'file-text'
}, {
  id: 'segment',
  name: 'Segmentation',
  icon: 'users'
}, {
  id: 'datamart',
  name: 'Datamart',
  icon: 'database'
}, {
  id: 'params',
  name: 'Parameters',
  icon: 'sliders-horizontal'
}];

// Renders a single nav row (used for both static and Marketing Suite items)
const NavRow = ({
  icon,
  name,
  badge,
  active,
  onClick,
  indent
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    padding: active ? `8px ${indent ? 22 : 18}px 8px ${indent ? 19 : 15}px` : `8px ${indent ? 26 : 18}px`,
    fontSize: 13,
    color: active ? '#62AB47' : '#505B79',
    fontWeight: active ? 600 : 400,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: active ? '#EEF3FA' : 'transparent',
    borderLeft: active ? '3px solid #62AB47' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background 120ms'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: icon,
  size: 16,
  strokeWidth: active ? 2 : 1.75
}), /*#__PURE__*/React.createElement("span", {
  style: {
    flex: 1
  }
}, name), badge && /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#F7941D',
    color: '#fff',
    fontSize: 9,
    padding: '1px 6px',
    borderRadius: 3,
    fontWeight: 700,
    letterSpacing: '0.08em'
  }
}, badge));
const Sidebar = ({
  active,
  currentScreenIdx,
  onNavigateScreen,
  suiteOpenDefault = true
}) => {
  const [suiteOpen, setSuiteOpen] = useState(suiteOpenDefault);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 232,
      background: '#fff',
      borderRight: '1px solid #EEF2F7',
      padding: '14px 0',
      overflow: 'auto',
      flexShrink: 0
    }
  }, STATIC_NAV.map((it, i) => {
    if (it.section) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          fontSize: 10,
          color: '#A6AEBD',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '10px 18px 6px'
        }
      }, it.section);
    }
    return /*#__PURE__*/React.createElement(NavRow, _extends({
      key: it.id
    }, it, {
      active: it.id === active
    }));
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => setSuiteOpen(o => !o),
    style: {
      fontSize: 10,
      color: '#F7941D',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      padding: '14px 18px 6px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: suiteOpen ? 'chevron-down' : 'chevron-right',
    size: 11
  }), "Marketing Suite", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      background: '#FFF4E6',
      color: '#B8620A',
      fontSize: 9,
      padding: '1px 5px',
      borderRadius: 3,
      fontWeight: 700,
      letterSpacing: '0.06em'
    }
  }, "FLOW")), suiteOpen && MARKETING_SUITE_FLOW.map(it => /*#__PURE__*/React.createElement(NavRow, {
    key: it.id,
    icon: it.icon,
    name: it.name,
    badge: it.badge,
    active: currentScreenIdx === it.idx,
    onClick: () => onNavigateScreen && onNavigateScreen(it.idx),
    indent: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6
    }
  }), /*#__PURE__*/React.createElement(NavRow, {
    icon: "git-branch",
    name: "Journey Builder",
    active: active === 'journey'
  }), /*#__PURE__*/React.createElement(NavRow, {
    icon: "inbox",
    name: "Signal Inbox",
    badge: "NEW",
    active: active === 'inbox'
  }));
};

// ----- Breadcrumb strip -----
const Breadcrumb = ({
  path
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '10px 24px',
    background: '#fff',
    borderBottom: '1px solid #EEF2F7',
    fontSize: 11,
    color: '#7E8A9A',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
}, path.map((p, i) => /*#__PURE__*/React.createElement("span", {
  key: i
}, i > 0 && /*#__PURE__*/React.createElement("span", {
  style: {
    margin: '0 8px',
    color: '#C9D2DE'
  }
}, "\u203A"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: i === path.length - 1 ? '#62AB47' : '#7E8A9A'
  }
}, p))));

// ----- Component label badge (top-left of each screen) -----
const ComponentLabel = ({
  component,
  icon
}) => {
  const C = SUITE.find(c => c.id === component);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: '#FFF4E6',
      color: '#B8620A',
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      border: '1px solid #FFE6CC'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon || C?.icon,
    size: 12
  }), C?.name || component);
};

// ----- Shell -----
const Shell = ({
  activeComponent,
  activeNav,
  breadcrumbs,
  children,
  currentScreenIdx,
  onNavigateScreen
}) => {
  const [menuOpen, setMenuOpen] = useState(true);
  // Fallback: pull from global so existing screens work without prop changes
  const idx = currentScreenIdx ?? (window.__suiteNav && window.__suiteNav.idx);
  const nav = onNavigateScreen ?? (window.__suiteNav && window.__suiteNav.go);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#F0F5FB'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    activeComponent: activeComponent,
    menuOpen: menuOpen,
    onToggleMenu: () => setMenuOpen(o => !o)
  }), /*#__PURE__*/React.createElement(Breadcrumb, {
    path: breadcrumbs
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      overflow: 'hidden'
    }
  }, menuOpen && /*#__PURE__*/React.createElement(Sidebar, {
    active: activeNav,
    currentScreenIdx: idx,
    onNavigateScreen: nav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 24
    }
  }, children)));
};
Object.assign(window, {
  Shell,
  SuiteNavigator,
  Header,
  Sidebar,
  Breadcrumb,
  ComponentLabel,
  MARKETING_SUITE_FLOW
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-suite/Shell.jsx", error: String((e && e.message) || e) }); }

})();

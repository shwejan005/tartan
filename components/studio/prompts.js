export const STUDIO_PROMPTS = {
  // 1. Canvas Entry Prompt
  canvasEntry: {
    title: "Design your authentication flow",
    prompt: "Drag blocks from the left to build login, signup, or onboarding. You can publish this as a hosted page or embed directly in your app.",
    suggestions: [
      "Start with template",
      "Blank canvas",
      "Import brand colors"
    ]
  },

  // 2. Block Drag Prompt
  blockDrag: {
    prompt: "Drop to add this step to your flow. Blocks represent real authentication logic, not just UI.",
    contextTips: {
      email: "Creates identity",
      otp: "Verification step",
      social: "OAuth connection",
      custom: "Saved to user profile"
    }
  },

  // 3. Layout Prompt
  layout: {
    prompt: "Choose how users first meet your app.",
    options: [
      { id: 'centered', label: "Centered card", desc: "Fastest, universal" },
      { id: 'split', label: "Split screen", desc: "Storytelling + auth" },
      { id: 'full', label: "Full page", desc: "Mobile first" },
      { id: 'modal', label: "Modal", desc: "Embed inside app" }
    ]
  },

  // 4. Theme Prompt
  theme: {
    prompt: "Match auth to your product identity. These tokens apply to every screen.",
    fields: ["Primary color", "Background", "Radius", "Font", "Logo"],
    tip: "If you paste your website URL, we can extract colors automatically."
  },

  // 5. Flow Builder Prompt
  flowBuilder: {
    prompt: "Authentication is a journey. Arrange steps in the order users should experience them.",
    logicHints: [
      "New user → verify → onboarding",
      "Returning → login → redirect",
      "Social → skip password"
    ]
  },

  // 6. Social Login Prompt
  socialLogin: {
    prompt: "Choose providers your audience trusts.",
    guidance: [
      { audience: "B2B", provider: "Google + Microsoft" },
      { audience: "Dev tools", provider: "GitHub" },
      { audience: "Creators", provider: "Apple" },
      { audience: "India", provider: "Google + Phone" }
    ]
  },

  // 7. Validation Prompt
  validation: {
    prompt: "Define what makes this field valid.",
    options: ["Required", "Regex", "Min length", "Custom message"]
  },

  // 8. Error Design Prompt
  errorDesign: {
    prompt: "Write errors in your product’s voice.",
    examples: ["Friendly", "Formal", "Playful", "Technical"]
  },

  // 9. Preview Prompt
  preview: {
    prompt: "Test how this feels before publishing.",
    modes: ["Mobile", "Desktop", "Dark", "Slow network"]
  },

  // 10. Publish Prompt
  publish: {
    prompt: "Publish creates a live auth endpoint instantly. Your app can use this URL or component.",
    codeSnippet: "<TartanAuth url=\"...\" />"
  },

  // 11. AI Helper Prompts
  aiHelper: [
    { type: 'copy', prompt: "Write login copy for a fintech app focused on trust." },
    { type: 'ux', prompt: "Suggest reducing friction in this flow." },
    { type: 'a11y', prompt: "Check contrast and keyboard flow." }
  ],

  // 12. Template Prompts
  templates: [
    "SaaS minimal",
    "Gaming neon",
    "Enterprise secure",
    "Creator fun",
    "Passkey-first"
  ],

  // 13. Conditional Logic Prompt
  logic: {
    prompt: "Add rules to adapt the journey.",
    examples: [
      "If social → skip password",
      "If phone → OTP screen",
      "If new → collect name"
    ]
  },

  // 14. Collaboration Prompt
  collaboration: {
    prompt: "Invite designer to edit without code access."
  },

  // 15. Safety Prompt
  safety: {
    prompt: "These blocks handle real user credentials. Avoid collecting unnecessary sensitive data."
  }
}

export const BLOCK_PROMPTS = {
  email: {
    title: "Email Field",
    prompt: "Primary identity for the user.",
    tips: [
      "Enable verification",
      "Avoid placeholder as instruction",
      "Use business domain checks"
    ],
    bestPractice: "Use clear labels and inline validation.",
    commonMistakes: "Blocking copy-paste in email confirm fields."
  },
  password: {
    title: "Password Field",
    prompt: "Secure credential for authentication.",
    tips: [
      "Allow show/hide password",
      "Suggest strong password policies",
      "Avoid complex rules that frustrate users"
    ],
    bestPractice: "Show password strength meter.",
    commonMistakes: "Hiding requirements until after submission."
  },
  social: {
    title: "Social Login",
    prompt: "One-click authentication via third parties.",
    tips: [
      "Prioritize most popular providers",
      "Use official branding colors",
      "Place above or below email based on priority"
    ],
    bestPractice: "Offer at least Google and one other option.",
    commonMistakes: "Overwhelming users with too many options."
  },
  button: {
    title: "Action Button",
    prompt: "Triggers the authentication action.",
    tips: [
      "Use action-oriented verbs (Sign In, Join)",
      "Ensure high contrast",
      "Show loading state"
    ],
    bestPractice: "Make it the most prominent element.",
    commonMistakes: "Vague labels like 'Submit'."
  },
  input: {
    title: "Text Input",
    prompt: "Collect additional user information.",
    tips: [
      "Use appropriate keyboard type (tel, url)",
      "Keep it optional if not critical",
      "Explain why you need this data"
    ],
    bestPractice: "Group related fields together.",
    commonMistakes: "Asking for too much info upfront."
  },
  otp: {
    title: "OTP Verification",
    prompt: "Verify ownership of email or phone.",
    tips: [
      "Auto-focus first digit",
      "Allow paste/auto-fill",
      "Provide resend option"
    ],
    bestPractice: "Use a clear 4-6 digit input pattern.",
    commonMistakes: "make it hard to correct a single digit."
  }
}

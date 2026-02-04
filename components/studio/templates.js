export const TEMPLATES = [
  // --- MINIMAL GROUP ---
  {
    id: 'minimal-1',
    name: 'Clean Slate',
    category: 'Minimal',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Sign In', style: { fontSize: '24px', fontWeight: '600', marginBottom: '24px' } },
        { id: '2', type: 'input', inputType: 'email', label: 'Email', placeholder: 'name@example.com' },
        { id: '3', type: 'button', label: 'Continue', variant: 'primary' },
      ],
      theme: { primaryColor: '#000000', borderRadius: '0px', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'minimal-2',
    name: 'Ghost',
    category: 'Minimal',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Welcome back', style: { fontSize: '18px', fontWeight: '500', color: '#666', textAlign: 'center', marginBottom: '32px' } },
        { id: '2', type: 'input', inputType: 'email', placeholder: 'Email address' },
        { id: '3', type: 'input', inputType: 'password', placeholder: 'Password' },
        { id: '4', type: 'button', label: 'Login', variant: 'primary' },
      ],
      theme: { primaryColor: '#333333', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'minimal-3',
    name: 'Mono Focus',
    category: 'Minimal',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'AUTHENTICATE', style: { fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'center' } },
        { id: '2', type: 'box', style: { height: '1px', backgroundColor: '#eee', margin: '20px 0' } },
        { id: '3', type: 'input', inputType: 'email', label: 'USER_ID' },
        { id: '4', type: 'button', label: 'INITIALIZE', variant: 'primary' },
      ],
      theme: { primaryColor: '#000000', borderRadius: '0px', layout: 'modal', font: 'mono' }
    }
  },
  {
    id: 'minimal-4',
    name: 'Airy',
    category: 'Minimal',
    design: {
      blocks: [
         { id: '1', type: 'text', content: 'Hello again', style: { fontSize: '32px', fontWeight: '300', textAlign: 'center', marginBottom: '8px' } },
         { id: '2', type: 'text', content: 'Enter your details below', style: { fontSize: '14px', color: '#999', textAlign: 'center', marginBottom: '32px' } },
         { id: '3', type: 'input', inputType: 'email', placeholder: 'Email' },
         { id: '4', type: 'button', label: 'Sign In →', variant: 'primary' },
      ],
      theme: { primaryColor: '#2563EB', borderRadius: '1rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'minimal-5',
    name: 'Just Social',
    category: 'Minimal',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Join Tartan', style: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center' } },
        { id: '2', type: 'social', label: 'Continue with Google' },
        { id: '3', type: 'social', label: 'Continue with GitHub' }, // Mocking multiple social by reusing type for now
        { id: '4', type: 'text', content: 'By joining, you agree to our Terms.', style: { fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '16px' } },
      ],
      theme: { primaryColor: '#000', borderRadius: '0.5rem', layout: 'modal', font: 'sans' }
    }
  },
  
  // --- DARK MODE GROUP ---
  {
    id: 'dark-1',
    name: 'Obsidian',
    category: 'Dark',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Member Login', style: { fontSize: '24px', fontWeight: 'bold', color: '#fff' } },
        { id: '2', type: 'input', inputType: 'email', label: 'Email', placeholder: 'user@domain.com' },
        { id: '3', type: 'input', inputType: 'password', label: 'Password', placeholder: '••••••' },
        { id: '4', type: 'button', label: 'Unlock', variant: 'primary' },
      ],
      theme: { primaryColor: '#fff', borderRadius: '0.25rem', layout: 'centered', font: 'sans' } // Note: Need to handle dark bg in preview logic or theme config
    }
  },
  {
    id: 'dark-2',
    name: 'Midnight Pro',
    category: 'Dark',
    design: {
      blocks: [
        { id: '1', type: 'box', style: { height: '40px', width: '40px', borderRadius: '50%', backgroundColor: '#6366f1', marginBottom: '16px' } },
        { id: '2', type: 'text', content: 'Welcome back', style: { fontSize: '20px', fontWeight: '500', color: '#e4e4e7' } },
        { id: '3', type: 'input', inputType: 'email', placeholder: 'name@company.com' },
        { id: '4', type: 'button', label: 'Sign In', variant: 'primary' },
        { id: '5', type: 'text', content: 'Forgot password?', style: { fontSize: '12px', color: '#a1a1aa', textAlign: 'center', marginTop: '12px' } },
      ],
      theme: { primaryColor: '#6366f1', borderRadius: '0.5rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'dark-3',
    name: 'Terminal',
    category: 'Dark',
    design: {
      blocks: [
        { id: '1', type: 'text', content: '> LOGIN_SEQUENCE_INIT', style: { fontSize: '14px', fontFamily: 'monospace', color: '#22c55e' } },
        { id: '2', type: 'input', inputType: 'text', label: '> USERNAME' },
        { id: '3', type: 'input', inputType: 'password', label: '> KEY' },
        { id: '4', type: 'button', label: '[ EXECUTE ]', variant: 'primary' },
      ],
      theme: { primaryColor: '#22c55e', borderRadius: '0px', layout: 'centered', font: 'mono' }
    }
  },
  {
    id: 'dark-4',
    name: 'Cyberpunk',
    category: 'Dark',
    design: {
      blocks: [
         { id: '1', type: 'text', content: 'NEO_ACCESS', style: { fontSize: '32px', fontWeight: '900', color: '#facc15', fontStyle: 'italic' } },
         { id: '2', type: 'input', inputType: 'email', placeholder: 'ID' },
         { id: '3', type: 'button', label: 'CONNECT', variant: 'primary' },
      ],
      theme: { primaryColor: '#facc15', borderRadius: '0px', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'dark-5',
    name: 'Deep Space',
    category: 'Dark',
    design: {
       blocks: [
           { id: '1', type: 'text', content: 'Orbit', style: { fontSize: '28px', fontWeight: 'bold', color: '#fff', textAlign: 'center' } },
           { id: '2', type: 'social', label: 'Sign in with Google' },
           { id: '3', type: 'box', style: { height: '1px', backgroundColor: '#ffffff20', margin: '20px 0' } },
           { id: '4', type: 'input', inputType: 'email', label: 'Email' },
           { id: '5', type: 'button', label: 'Launch', variant: 'primary' },
       ],
       theme: { primaryColor: '#8b5cf6', borderRadius: '1rem', layout: 'centered', font: 'sans' }
    }
  },

  // --- SPLIT LAYOUT GROUP ---
  {
    id: 'split-1',
    name: 'Corporate Split',
    category: 'Split',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Enterprise Login', style: { fontSize: '24px', fontWeight: '600' } },
        { id: '2', type: 'text', content: 'Use your SSO credentials.', style: { fontSize: '14px', color: '#666', marginBottom: '24px' } },
        { id: '3', type: 'input', inputType: 'email', label: 'Work Email' },
        { id: '4', type: 'button', label: 'Continue with SSO', variant: 'primary' },
      ],
      theme: { primaryColor: '#0f172a', borderRadius: '0.25rem', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'split-2',
    name: 'Creative Studio',
    category: 'Split',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Create Account', style: { fontSize: '32px', fontWeight: 'bold', fontFamily: 'serif' } },
        { id: '2', type: 'input', inputType: 'text', label: 'Name' },
        { id: '3', type: 'input', inputType: 'email', label: 'Email' },
        { id: '4', type: 'input', inputType: 'password', label: 'Password' },
        { id: '5', type: 'button', label: 'Join the Community', variant: 'primary' },
      ],
      theme: { primaryColor: '#ec4899', borderRadius: '0.75rem', layout: 'split', font: 'serif' }
    }
  },
  {
    id: 'split-3',
    name: 'Product Launch',
    category: 'Split',
    design: {
       blocks: [
           { id: '1', type: 'box', style: { width: '40px', height: '40px', backgroundColor: '#000', marginBottom: '20px' } },
           { id: '2', type: 'text', content: 'Get Early Access', style: { fontSize: '24px', fontWeight: 'bold' } },
           { id: '3', type: 'input', inputType: 'email', placeholder: 'Enter your email' },
           { id: '4', type: 'button', label: 'Request Access', variant: 'primary' },
           { id: '5', type: 'text', content: 'Limited spots available.', style: { fontSize: '12px', color: '#666', marginTop: '12px' } },
       ],
       theme: { primaryColor: '#000', borderRadius: '0px', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'split-4',
    name: 'Nature',
    category: 'Split',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Welcome to Flora', style: { fontSize: '28px', color: '#166534', fontWeight: '600' } },
            { id: '2', type: 'input', inputType: 'email', label: 'Email' },
            { id: '3', type: 'input', inputType: 'password', label: 'Password' },
            { id: '4', type: 'button', label: 'Sign In', variant: 'primary' },
        ],
        theme: { primaryColor: '#166534', borderRadius: '1rem', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'split-5',
    name: 'Bold & Loud',
    category: 'Split',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'START HERE.', style: { fontSize: '48px', fontWeight: '900', lineHeight: '1' } },
            { id: '2', type: 'input', inputType: 'text', placeholder: 'USERNAME' },
            { id: '3', type: 'input', inputType: 'password', placeholder: 'PASSWORD' },
            { id: '4', type: 'button', label: 'GO ->', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'split', font: 'sans' }
    }
  },

  // --- COLORFUL / BRANDED GROUP ---
  {
    id: 'color-1',
    name: 'Sunset',
    category: 'Colorful',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Good Evening', style: { fontSize: '24px', fontWeight: 'bold', color: '#c2410c' } },
        { id: '2', type: 'input', inputType: 'email', label: 'Email Address' },
        { id: '3', type: 'button', label: 'Log In', variant: 'primary' },
      ],
      theme: { primaryColor: '#f97316', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'color-2',
    name: 'Oceanic',
    category: 'Colorful',
    design: {
       blocks: [
           { id: '1', type: 'box', style: { height: '8px', width: '40px', backgroundColor: '#0ea5e9', marginBottom: '16px' } },
           { id: '2', type: 'text', content: 'Dive In', style: { fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e' } },
           { id: '3', type: 'input', inputType: 'email', placeholder: 'Email' },
           { id: '4', type: 'input', inputType: 'password', placeholder: 'Password' },
           { id: '5', type: 'button', label: 'Surfs Up', variant: 'primary' },
       ],
       theme: { primaryColor: '#0ea5e9', borderRadius: '1.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'color-3',
    name: 'Berry',
    category: 'Colorful',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Sweet.', style: { fontSize: '30px', fontWeight: '800', color: '#db2777' } },
            { id: '2', type: 'social', label: 'Continue with Apple' },
            { id: '3', type: 'text', content: 'or email', style: { fontSize: '12px', color: '#db2777', textAlign: 'center', margin: '10px 0' } },
            { id: '4', type: 'input', inputType: 'email' },
            { id: '5', type: 'button', label: 'Next', variant: 'primary' },
        ],
        theme: { primaryColor: '#db2777', borderRadius: '1rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'color-4',
    name: 'Minty',
    category: 'Colorful',
    design: {
         blocks: [
             { id: '1', type: 'text', content: 'Fresh Start', style: { fontSize: '24px', fontWeight: '600', color: '#059669' } },
             { id: '2', type: 'input', inputType: 'text', label: 'Name' },
             { id: '3', type: 'input', inputType: 'email', label: 'Email' },
             { id: '4', type: 'button', label: 'Sign Up', variant: 'primary' },
         ],
         theme: { primaryColor: '#10b981', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'color-5',
    name: 'Royal',
    category: 'Colorful',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'VIP Access', style: { fontSize: '24px', fontFamily: 'serif', color: '#5b21b6' } },
             { id: '2', type: 'input', inputType: 'password', label: 'Access Code' },
             { id: '3', type: 'button', label: 'Enter', variant: 'primary' },
        ],
         theme: { primaryColor: '#5b21b6', borderRadius: '0.25rem', layout: 'modal', font: 'serif' }
    }
  },

  // --- SOCIAL FOCUSED GROUP ---
  {
    id: 'social-1',
    name: 'Social First',
    category: 'Social',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Join the conversation', style: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' } },
        { id: '2', type: 'social', label: 'Continue with Google' },
        { id: '3', type: 'social', label: 'Continue with Twitter' },
        { id: '4', type: 'social', label: 'Continue with GitHub' },
        { id: '5', type: 'text', content: 'Maybe later?', style: { fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '16px', cursor: 'pointer' } },
      ],
      theme: { primaryColor: '#000', borderRadius: '0.75rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'social-2',
    name: 'Grid Social',
    category: 'Social',
    design: {
       blocks: [
           { id: '1', type: 'text', content: 'Login', style: { fontSize: '20px', fontWeight: '600', marginBottom: '20px' } },
           { id: '2', type: 'social', label: 'Google' }, // Mocking separate implementations
           { id: '3', type: 'social', label: 'Facebook' },
           { id: '4', type: 'box', style: { height: '1px', backgroundColor: '#eee', margin: '20px 0' } },
           { id: '5', type: 'input', inputType: 'email', placeholder: 'email@example.com' },
           { id: '6', type: 'button', label: 'Email Login', variant: 'primary' },
       ],
       theme: { primaryColor: '#3b82f6', borderRadius: '0.5rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'social-3',
    name: 'Minimal Social',
    category: 'Social',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Welcome', style: { fontSize: '18px', fontWeight: '500', textAlign: 'center' } },
            { id: '2', type: 'social', label: 'Google' },
            { id: '3', type: 'text', content: 'No password needed.', style: { fontSize: '11px', color: '#999', textAlign: 'center' } },
        ],
        theme: { primaryColor: '#000', borderRadius: '1rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'social-4',
    name: 'Community',
    category: 'Social',
    design: {
         blocks: [
             { id: '1', type: 'image', src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60', style: { height: '120px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' } },
             { id: '2', type: 'text', content: 'Join 10,000+ members', style: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center' } },
             { id: '3', type: 'social', label: 'Join with Discord' },
         ],
         theme: { primaryColor: '#5865F2', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'social-5',
    name: 'Dev Login',
    category: 'Social',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Developer Portal', style: { fontSize: '22px', fontFamily: 'monospace', fontWeight: 'bold' } },
            { id: '2', type: 'social', label: 'GitHub' },
            { id: '3', type: 'social', label: 'GitLab' },
            { id: '4', type: 'social', label: 'BitBucket' },
        ],
        theme: { primaryColor: '#24292e', borderRadius: '0.25rem', layout: 'split', font: 'mono' }
    }
  },

  // --- REGISTRATION / COMPLEX GROUP ---
  {
    id: 'reg-1',
    name: 'Full Registration',
    category: 'Complex',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Create your account', style: { fontSize: '24px', fontWeight: '600' } },
        { id: '2', type: 'input', inputType: 'text', label: 'First Name', placeholder: 'Jane' },
        { id: '3', type: 'input', inputType: 'text', label: 'Last Name', placeholder: 'Doe' },
        { id: '4', type: 'input', inputType: 'email', label: 'Email', placeholder: 'jane@example.com' },
        { id: '5', type: 'input', inputType: 'password', label: 'Password' },
        { id: '6', type: 'button', label: 'Sign Up', variant: 'primary' },
      ],
      theme: { primaryColor: '#000', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'reg-2',
    name: 'Newsletter',
    category: 'Complex',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Subscribe', style: { fontSize: '28px', fontWeight: 'bold' } },
            { id: '2', type: 'text', content: 'Get the latest news directly to your inbox.', style: { fontSize: '14px', color: '#666', marginBottom: '20px' } },
            { id: '3', type: 'input', inputType: 'email', placeholder: 'Email address' },
            { id: '4', type: 'button', label: 'Subscribe', variant: 'primary' },
            { id: '5', type: 'text', content: 'No spam, ever.', style: { fontSize: '10px', color: '#999', marginTop: '8px' } },
        ],
        theme: { primaryColor: '#ef4444', borderRadius: '0.25rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'reg-3',
    name: 'Survey Style',
    category: 'Complex',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Step 1 of 3', style: { fontSize: '12px', color: '#888', textTransform: 'uppercase' } },
            { id: '2', type: 'text', content: 'Whats your email?', style: { fontSize: '24px', fontWeight: '500' } },
            { id: '3', type: 'input', inputType: 'email', placeholder: 'name@example.com' },
            { id: '4', type: 'button', label: 'Next Step', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'reg-4',
    name: 'Waitlist',
    category: 'Complex',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Join the Waitlist', style: { fontSize: '32px', fontWeight: '800', textAlign: 'center' } },
            { id: '2', type: 'text', content: 'We are launching soon.', style: { fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '32px' } },
            { id: '3', type: 'input', inputType: 'email', placeholder: 'Email' },
            { id: '4', type: 'button', label: 'Join', variant: 'primary' },
        ],
        theme: { primaryColor: '#7c3aed', borderRadius: '1rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'reg-5',
    name: 'Feedback',
    category: 'Complex',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Feedback', style: { fontSize: '20px', fontWeight: '600' } },
            { id: '2', type: 'input', inputType: 'text', label: 'Name' },
            { id: '3', type: 'input', inputType: 'text', label: 'Topic' },
            { id: '4', type: 'box', style: { height: '100px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee' } }, // Mock textarea
            { id: '5', type: 'button', label: 'Submit Ticket', variant: 'primary' },
        ],
        theme: { primaryColor: '#2563eb', borderRadius: '0.25rem', layout: 'modal', font: 'sans' }
    }
  },

  // --- CLASSIC / RETRO GROUP ---
  {
    id: 'classic-1',
    name: 'Serif Classic',
    category: 'Classic',
    design: {
      blocks: [
        { id: '1', type: 'text', content: 'Est. 2024', style: { fontSize: '12px', fontStyle: 'italic', textAlign: 'center', color: '#666' } },
        { id: '2', type: 'text', content: 'The Club', style: { fontSize: '36px', fontFamily: 'serif', textAlign: 'center', marginBottom: '24px' } },
        { id: '3', type: 'input', inputType: 'text', label: 'Member ID' },
        { id: '4', type: 'input', inputType: 'password', label: 'Passcode' },
        { id: '5', type: 'button', label: 'Enter', variant: 'primary' },
      ],
      theme: { primaryColor: '#1c1917', borderRadius: '2px', layout: 'centered', font: 'serif' }
    }
  },
  {
    id: 'classic-2',
    name: '90s Web',
    category: 'Classic',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Welcome to my Homepage', style: { fontSize: '24px', fontFamily: 'Times New Roman', textAlign: 'center', color: 'blue', textDecoration: 'underline' } },
            { id: '2', type: 'box', style: { height: '2px', backgroundColor: 'gray', margin: '10px 0' } },
            { id: '3', type: 'input', inputType: 'text', label: 'Name:' },
            { id: '4', type: 'button', label: 'Submit Query', variant: 'secondary' },
        ],
        theme: { primaryColor: '#000080', borderRadius: '0px', layout: 'centered', font: 'serif' }
    }
  },
  {
    id: 'classic-3',
    name: 'Paper',
    category: 'Classic',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Note', style: { fontSize: '24px', fontWeight: 'bold', fontFamily: 'Courier New' } },
            { id: '2', type: 'text', content: 'Please sign below', style: { fontSize: '14px', fontFamily: 'Courier New', marginBottom: '20px' } },
            { id: '3', type: 'input', inputType: 'email', label: 'Signer Email' },
            { id: '4', type: 'button', label: 'Sign', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'modal', font: 'mono' }
    }
  },
  {
    id: 'classic-4',
    name: 'Blueprint',
    category: 'Classic',
    design: {
         blocks: [
             { id: '1', type: 'text', content: 'PROJECT: ALPINE', style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } },
             { id: '2', type: 'box', style: { height: '1px', backgroundColor: '#fff', margin: '20px 0', opacity: '0.5' } },
             { id: '3', type: 'input', inputType: 'password', label: 'SECURITY_CODE' },
             { id: '4', type: 'button', label: 'ACCESS', variant: 'primary' },
         ],
         theme: { primaryColor: '#2563eb', borderRadius: '0px', layout: 'centered', font: 'sans' } // Needs blue bg context really
    }
  },
  {
    id: 'classic-5',
    name: 'Newspaper',
    category: 'Classic',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Daily News', style: { fontSize: '42px', fontFamily: 'serif', fontWeight: '900', textAlign: 'center', borderBottom: '3px double #000', paddingBottom: '10px' } },
            { id: '2', type: 'text', content: 'SUBSCRIBE TODAY', style: { fontSize: '12px', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' } },
            { id: '3', type: 'input', inputType: 'email', placeholder: 'Email' },
            { id: '4', type: 'button', label: 'Read Now', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'centered', font: 'serif' }
    }
  },
  
  // --- VARIOUS EXTENSIONS ---
  {
    id: 'ext-1',
    name: 'Split Image Left',
    category: 'Split',
    design: {
      blocks: [
          { id: '1', type: 'text', content: 'Welcome Back', style: { fontSize: '24px', fontWeight: 'bold' } },
          { id: '2', type: 'input', inputType: 'email', label: 'Email' },
          { id: '3', type: 'input', inputType: 'password', label: 'Password' },
          { id: '4', type: 'button', label: 'Login', variant: 'primary' },
      ],
      theme: { primaryColor: '#000', borderRadius: '0.5rem', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'ext-2',
    name: 'Glassmorphism',
    category: 'Modern',
    design: {
      blocks: [
         { id: '1', type: 'text', content: 'Glass UI', style: { fontSize: '24px', fontWeight: '600', color: 'rgba(0,0,0,0.8)' } },
         { id: '2', type: 'input', inputType: 'email', placeholder: 'Email' },
         { id: '3', type: 'button', label: 'Sign In', variant: 'secondary' },
      ],
      theme: { primaryColor: '#fff', borderRadius: '1rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'ext-3',
    name: 'Stacked Cards',
    category: 'Modern',
    design: {
        blocks: [
            { id: '1', type: 'box', style: { height: '10px', backgroundColor: '#e4e4e7', borderRadius: '8px 8px 0 0', width: '90%', margin: '0 auto' } },
            { id: '2', type: 'text', content: 'Your Account', style: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center' } },
            { id: '3', type: 'input', inputType: 'email', label: 'Email' },
            { id: '4', type: 'button', label: 'Next', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '1rem', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'ext-4',
    name: 'Floating Label',
    category: 'Modern',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Sign In', style: { fontSize: '24px', fontWeight: 'bold' } },
            // Floating label simulation with inputs is tricky without custom components, just using standard inputs
            { id: '2', type: 'input', inputType: 'email', placeholder: 'name@example.com' },
            { id: '3', type: 'input', inputType: 'password', placeholder: 'password' },
            { id: '4', type: 'button', label: 'Go', variant: 'primary' },
        ],
        theme: { primaryColor: '#2563eb', borderRadius: '0.25rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'ext-5',
    name: 'Big Typography',
    category: 'Modern',
    design: {
        blocks: [
             { id: '1', type: 'text', content: 'HEY.', style: { fontSize: '64px', fontWeight: '900', lineHeight: 1 } },
             { id: '2', type: 'text', content: 'Lets get you logged in.', style: { fontSize: '18px', marginBottom: '24px' } },
             { id: '3', type: 'social', label: 'Apple' },
             { id: '4', type: 'social', label: 'Google' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'split', font: 'sans' }
    }
  },
  {
    id: 'ext-6',
    name: 'Soft Shadow',
    category: 'Modern',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Soft UI', style: { fontSize: '22px', fontWeight: '600', color: '#555' } },
            { id: '2', type: 'input', inputType: 'email', placeholder: 'Email' },
            { id: '3', type: 'button', label: 'Enter', variant: 'primary' },
        ],
        theme: { primaryColor: '#e5e7eb', borderRadius: '1.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'ext-7',
    name: 'Contrast',
    category: 'Modern',
    design: {
        blocks: [
            { id: '1', type: 'box', style: { height: '60px', backgroundColor: '#000', marginBottom: '-30px', zIndex: 10, position: 'relative' } },
            { id: '2', type: 'text', content: 'Login', style: { fontSize: '24px', fontWeight: 'bold', paddingTop: '40px' } },
            { id: '3', type: 'input', inputType: 'email', label: 'Email' },
            { id: '4', type: 'button', label: 'Login', variant: 'primary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'ext-8',
    name: 'Gradient Button',
    category: 'Modern',
    design: {
         blocks: [
             { id: '1', type: 'text', content: 'Welcome', style: { fontSize: '24px', fontWeight: 'bold' } },
             { id: '2', type: 'input', inputType: 'email', placeholder: 'Email' },
             { id: '3', type: 'button', label: 'Gradient Login', variant: 'primary' }, // Gradient logic would need css injection or style overrides, ignoring for now
         ],
         theme: { primaryColor: '#db2777', borderRadius: '0.5rem', layout: 'centered', font: 'sans' }
    }
  },
  {
    id: 'ext-9',
    name: 'Outlined',
    category: 'Minimal',
    design: {
        blocks: [
            { id: '1', type: 'text', content: 'Login', style: { fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' } },
            { id: '2', type: 'input', inputType: 'email', label: 'Email' },
            { id: '3', type: 'input', inputType: 'password', label: 'Password' },
            { id: '4', type: 'button', label: 'Authenticate', variant: 'secondary' },
        ],
        theme: { primaryColor: '#000', borderRadius: '0px', layout: 'modal', font: 'sans' }
    }
  },
  {
    id: 'ext-10',
    name: 'Avatar',
    category: 'Social',
    design: {
         blocks: [
             { id: '1', type: 'box', style: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eee', margin: '0 auto 16px', backgroundImage: 'url(https://github.com/shadcn.png)', backgroundSize: 'cover' } },
             { id: '2', type: 'text', content: 'Welcome back, User', style: { fontSize: '18px', fontWeight: '600', textAlign: 'center' } },
             { id: '3', type: 'input', inputType: 'password', placeholder: 'Enter password' },
             { id: '4', type: 'button', label: 'Resume Session', variant: 'primary' },
         ],
         theme: { primaryColor: '#000', borderRadius: '1rem', layout: 'centered', font: 'sans' }
    }
  }
]

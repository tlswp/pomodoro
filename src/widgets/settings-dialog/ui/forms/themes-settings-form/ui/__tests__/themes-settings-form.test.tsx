import { RadioGroup } from '@radix-ui/react-radio-group';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ThemePresets } from '@/shared/config/theme';

import { ThemeItem } from '../theme-item';

const dummyPreset = 'dark' as ThemePresets;
const colors = {
  border: '#ff0000',
  from: '#00ff00',
  to: '#0000ff',
};

describe('ThemeItem Component', () => {
  it('renders correctly when selected', () => {
    render(
      <RadioGroup>
        <ThemeItem
          label="Dark Theme"
          value={dummyPreset}
          selected={true}
          colors={colors}
        />
      </RadioGroup>
    );
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    const container = screen.getByText('Dark Theme').parentElement;
    const styledDiv = container?.firstElementChild as HTMLElement;
    expect(styledDiv.style.borderColor).toBe(colors.border);
    expect(styledDiv.className).toContain('border-transparent');
    expect(styledDiv.className).toContain('bg-gradient-to-tr');
  });

  it('renders correctly when not selected', () => {
    render(
      <RadioGroup>
        <ThemeItem
          label="Dark Theme"
          value={dummyPreset}
          selected={false}
          colors={colors}
        />
      </RadioGroup>
    );
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    const container = screen.getByText('Dark Theme').parentElement;
    const styledDiv = container?.firstElementChild as HTMLElement;
    expect(styledDiv.style.borderColor).toBe('transparent');
    expect(styledDiv.className).not.toContain('border-transparent');
    expect(styledDiv.className).not.toContain('bg-gradient-to-tr');
  });
});

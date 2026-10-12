// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { Hash } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { InfoField, InfoFieldGroup } from '../src/blocks/info-field';
import { SettingsCard, SettingsPanel } from '../src/blocks/settings-card';
import { Card } from '../src/components/ui/card';
import { SurfaceProvider } from '../src/lib/surface-context';

afterEach(cleanup);

function root(node: React.ReactNode): HTMLElement {
    return render(node).container.firstElementChild as HTMLElement;
}

describe('a surface provider', () => {
    it('turns every default surface to glass, blocks and components alike', () => {
        const group = root(
            <SurfaceProvider surface="glass">
                <InfoFieldGroup>
                    <InfoField icon={Hash} label="Customer" value="cus_1" />
                </InfoFieldGroup>
            </SurfaceProvider>,
        );

        expect(group.className).toContain('glass-panel');
        cleanup();

        expect(
            root(
                <SurfaceProvider surface="glass">
                    <Card>Plan</Card>
                </SurfaceProvider>,
            ).className,
        ).toContain('glass-panel');
    });

    it('leaves a surface passed on the component alone', () => {
        const group = root(
            <SurfaceProvider surface="glass">
                <InfoFieldGroup surface="none">
                    <InfoField icon={Hash} label="Customer" value="cus_1" />
                </InfoFieldGroup>
            </SurfaceProvider>,
        );

        expect(group.className).not.toContain('glass-panel');
        expect(group.className).not.toContain('bg-(--grouped-fill)');
    });

    it('keeps inset meaning no surface', () => {
        const panel = root(
            <SurfaceProvider surface="glass">
                <SettingsPanel>Rows</SettingsPanel>
            </SurfaceProvider>,
        );

        expect(panel.className).not.toContain('glass-panel');
    });

    it('changes nothing without a provider', () => {
        expect(
            root(
                <SettingsCard icon={Hash} title="Profile" description="Details">
                    Fields
                </SettingsCard>,
            ).className,
        ).toContain('bg-(--grouped-fill)');
    });
});

import { Home } from 'lucide-react';

import { GlassTabBarItem } from '@/components/ui/glass-tab-bar';

export const disabledTab = (
    // @ts-expect-error tab bar items are never disabled
    <GlassTabBarItem value="home" icon={<Home />} label="Home" disabled />
);

import * as React from 'react';
import { Bar, BarStack } from 'recharts';

export type StackableProps = { stackId?: string };

type StackableMark = React.ReactElement<StackableProps>;

export function useBarStacks(
    marks: readonly StackableMark[],
    radius: number,
): React.ReactElement[] {
    const chartId = React.useId().replace(/[^\w-]/g, '');
    const stacks = new Map<string, StackableMark[]>();
    const output: (StackableMark | string)[] = [];

    for (const mark of marks) {
        const stackId = mark.type === Bar ? mark.props.stackId : undefined;

        if (stackId === undefined) {
            output.push(mark);
            continue;
        }

        if (!stacks.has(stackId)) {
            stacks.set(stackId, []);
            output.push(stackId);
        }

        stacks.get(stackId)?.push(mark);
    }

    const ids = [...stacks.keys()];

    return output.map((entry) =>
        typeof entry === 'string'
            ? React.createElement(
                  BarStack,
                  {
                      key: `stack-${entry}`,
                      stackId: `${chartId}-stack-${ids.indexOf(entry)}`,
                      radius,
                  },
                  stacks.get(entry),
              )
            : entry,
    );
}

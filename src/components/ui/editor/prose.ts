const baseProse =
    'text-sm font-medium leading-relaxed [&_p]:my-2 [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-normal [&_pre]:my-3 [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_hr]:my-4 [&_hr]:border-border';

const taskListProse = [
    '[&_ul[data-type=taskList]]:list-none',
    '[&_ul[data-type=taskList]]:pl-0',
    '[&_ul[data-type=taskList]>li]:flex',
    '[&_ul[data-type=taskList]>li]:items-start',
    '[&_ul[data-type=taskList]>li]:gap-2',
    '[&_ul[data-type=taskList]>li>label]:flex',
    '[&_ul[data-type=taskList]>li>label]:h-[1lh]',
    '[&_ul[data-type=taskList]>li>label]:shrink-0',
    '[&_ul[data-type=taskList]>li>label]:items-center',
    '[&_ul[data-type=taskList]>li>label]:select-none',
    '[&_ul[data-type=taskList]>li>label>input]:size-4',
    '[&_ul[data-type=taskList]>li>label>input]:cursor-pointer',
    '[&_ul[data-type=taskList]>li>label>input]:accent-primary',
    '[&_ul[data-type=taskList]>li>div]:min-w-0',
    '[&_ul[data-type=taskList]>li>div]:flex-1',
    '[&_ul[data-type=taskList]>li>div>p]:my-0',
    '[&_ul[data-type=taskList]>li[data-checked=true]>div]:text-muted-foreground',
    '[&_ul[data-type=taskList]>li[data-checked=true]>div]:line-through',
].join(' ');

export const editorProse = `${baseProse} ${taskListProse}`;

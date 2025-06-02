import {
  ActionBarPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from '@assistant-ui/react';
import { ArrowDownIcon, CheckIcon, CopyIcon } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';

import IconReset from '@comp/icons/IconReset';
import IconSend from '@comp/icons/IconSend';

import { MarkdownText } from '@src/components/assistant-ui/markdown-text';
import { TooltipIconButton } from '@src/components/assistant-ui/tooltip-icon-button';
import { Button } from '@src/components/ui/button';

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip='Scroll to bottom'
        variant='outline'
        className='absolute -top-8 rounded-full disabled:invisible'
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  const suggestions = [
    { id: 1, prompt: '에디슨 플랫폼이 무엇인가요?' },
    { id: 2, prompt: 'ANOVA 분석 시 주의할 점을 설명해주세요.' },
    { id: 3, prompt: '귀무가설에 대해 설명해주세요.' },
  ];

  return (
    <div className='flex w-full flex-col justify-center gap-[8px]'>
      {suggestions.map(({ id, prompt }) => (
        <ThreadPrimitive.Suggestion
          key={id}
          className='hover:bg-gray-20/20 flex w-[560px] cursor-pointer flex-col rounded-[8px] border bg-white px-[20px] py-[12px] transition-colors ease-in'
          prompt={prompt}
          method='replace'
          autoSend
        >
          <div className='font-body2-regular line-clamp-2 flex items-center gap-[10px] text-ellipsis'>
            <IconSend className='fill-primary size-[24px]' />
            {prompt}
          </div>
        </ThreadPrimitive.Suggestion>
      ))}
    </div>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className='flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col'>
        <div className='flex w-full flex-col gap-[10px]'>
          {/* 처음 */}
          <div className='font-body2-semibold mt-4'>
            이런 질문들을 물어볼 수 있어요:
          </div>
          <ThreadWelcomeSuggestions />
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill='currentColor'
      width='16'
      height='16'
    >
      <rect width='10' height='10' x='3' y='3' rx='2' />
    </svg>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          {/* <Button className='font-button1-medium bg-blue-light-active border-gray-20 ease size-fit border px-[24px] py-[12px] transition-opacity'>
            보내기
          </Button> */}
          <TooltipIconButton
            tooltip='send'
            variant='default'
            className='font-button1-medium border-gray-20 size-fit cursor-pointer border px-[24px] py-[12px] transition-opacity ease-in'
          >
            보내기
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip='Cancel'
            variant='default'
            className='my-2.5 size-8 p-2 transition-opacity ease-in'
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className='focus-within:border-ring/20 flex w-full flex-wrap items-center rounded-lg border bg-white py-[8px] pl-[20px] pr-[8px] shadow-sm transition-colors ease-in'>
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder='AI 어시스턴트에게 궁금한 점을 물어보세요.'
        className='placeholder:text-gray-40 font-body2-regular max-h-40 flex-grow resize-none border-none bg-transparent outline-none focus:ring-0 disabled:cursor-not-allowed'
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};

// 수정기능 비활성화
// const UserActionBar: FC = () => {
//   return (
//     <ActionBarPrimitive.Root
//       hideWhenRunning
//       autohide='not-last'
//       className='col-start-1 row-start-2 mr-3 mt-2.5 flex flex-col items-end'
//     >
//       <ActionBarPrimitive.Edit asChild>
//         <TooltipIconButton tooltip='Edit'>
//           <PencilIcon />
//         </TooltipIconButton>
//       </ActionBarPrimitive.Edit>
//     </ActionBarPrimitive.Root>
//   );
// };

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className='bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl'>
      <ComposerPrimitive.Input className='text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none' />

      <div className='mx-3 mb-3 flex items-center justify-center gap-2 self-end'>
        <ComposerPrimitive.Cancel asChild>
          <Button variant='ghost'>Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className='border-destructive bg-destructive/10 dark:bg-destructive/5 text-destructive mt-2 rounded-md border p-3 text-sm dark:text-red-200'>
        <ErrorPrimitive.Message className='line-clamp-2' />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide='not-last'
      autohideFloat='single-branch'
      className='text-muted-foreground data-[floating]:bg-background col-start-3 row-start-2 -ml-1 flex gap-1 data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm'
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip='Copy'>
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      {/* <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip='Refresh'>
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload> */}
    </ActionBarPrimitive.Root>
  );
};

// const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
//   className,
//   ...rest
// }) => {
//   return (
//     <BranchPickerPrimitive.Root
//       hideWhenSingleBranch
//       className={cn(
//         'text-muted-foreground inline-flex items-center text-xs',
//         className,
//       )}
//       {...rest}
//     >
//       <BranchPickerPrimitive.Previous asChild>
//         <TooltipIconButton tooltip='Previous'>
//           <ChevronLeftIcon />
//         </TooltipIconButton>
//       </BranchPickerPrimitive.Previous>
//       <span className='font-medium'>
//         <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
//       </span>
//       <BranchPickerPrimitive.Next asChild>
//         <TooltipIconButton tooltip='Next'>
//           <ChevronRightIcon />
//         </TooltipIconButton>
//       </BranchPickerPrimitive.Next>
//     </BranchPickerPrimitive.Root>
//   );
// };

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className='relative grid w-full max-w-[var(--thread-max-width)] grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] py-4'>
      <div className='text-foreground col-span-2 col-start-2 row-start-1 my-1.5 max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-7'>
        <MessagePrimitive.Content
          components={{ Text: MarkdownText, Reasoning: MarkdownText }}
        />
        <MessageError />
      </div>

      <AssistantActionBar />

      {/* <BranchPicker className='col-start-2 row-start-2 -ml-2 mr-2' /> */}
    </MessagePrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className='grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 py-4 [&:where(>*)]:col-start-2'>
      {/* <UserActionBar /> */}

      <div
        className='bg-gray-20 text-foreground col-start-2 row-start-2 max-w-[calc(var(--thread-max-width)*0.8)] break-words px-5 py-2.5'
        style={{ borderRadius: '30px 0px 20px 30px' }}
      >
        <MessagePrimitive.Content />
      </div>

      {/* <BranchPicker className='col-span-full col-start-1 row-start-3 -mr-1 justify-end' /> */}
    </MessagePrimitive.Root>
  );
};

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className='bg-gray-10 box-border flex h-full flex-1 flex-col overflow-hidden rounded-[8px] border'
      style={{
        ['--thread-max-width' as string]: '42rem',
      }}
    >
      <div className='font-heading3-semibold flex items-center justify-between gap-[4px] border-b px-[24px] py-[15px]'>
        <div className='flex items-center gap-[4px]'>
          AI 어시스턴트
          <Image src='/icon/ai-icon.svg' width={17} height={17} alt='ai-icon' />
        </div>
        <Button variant='outline' className='border-primary px-[12px] py-[4px]'>
          <div className='text-primary font-button2-medium flex items-center justify-center gap-[4px]'>
            <IconReset className='fill-primary size-[24px]' />
            초기화
          </div>
        </Button>
      </div>

      {/* <ThreadList /> */}

      <ThreadPrimitive.Viewport
        className='relative flex h-full flex-1 flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8'
        autoScroll={true}
      >
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            EditComposer,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className='min-h-8 flex-grow' />
        </ThreadPrimitive.If>

        <div className='sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-[24px]'>
          <ThreadScrollToBottom />
          <Composer />
          <div className='font-body3-regular mt-[8px] text-gray-50'>
            교수님 논문 및 자료에 대한 질문 요약 등을 할 수 있어요.
          </div>
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

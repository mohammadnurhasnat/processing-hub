import { MessageSquare, Loader2, UserCheck } from 'lucide-react';
import React from 'react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface ChatHistoryListProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  isHandover: boolean;
}

function parseTextWithBold(text: string) {
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-extrabold text-blue-700 dark:text-blue-300">
          {part}
        </strong>
      );
    }
    
    const subParts = part.split('*');
    return subParts.map((subPart, subIndex) => {
      if (subIndex % 2 === 1) {
        return (
          <strong key={`sub-${subIndex}`} className="font-semibold text-gray-900 dark:text-gray-100">
            {subPart}
          </strong>
        );
      }
      return subPart;
    });
  });
}

function formatMessage(content: string, isUser: boolean) {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  
  const flushList = (key: number) => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="space-y-2 my-2.5 pl-5 list-disc list-outside text-gray-800 dark:text-slate-100">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      flushList(index);
      renderedElements.push(<div key={`space-${index}`} className="h-1.5" />);
      return;
    }

    // Match bullets like *, -, •, or digits (e.g., 1., 2., ১., ২.)
    const bulletRegex = /^([\s]*)([\*\-•]|\d+[\.\)]|[১২৩৪৫৬৭৮৯০]+[\.\)])\s+(.*)$/;
    const match = trimmed.match(bulletRegex);
    
    if (match) {
      const contentText = match[3];
      currentListItems.push(
        <li key={`item-${index}`} className="leading-relaxed pl-1 text-sm text-gray-800 dark:text-slate-200">
          {parseTextWithBold(contentText)}
        </li>
      );
    } else {
      flushList(index);
      
      const isHeader = trimmed.endsWith(':') || (trimmed.startsWith('**') && trimmed.endsWith('**'));
      
      if (isHeader) {
        const cleanedHeader = trimmed.replace(/^\*\*|\*\*$/g, '');
        renderedElements.push(
          <h4 key={`header-${index}`} className="font-bold text-blue-700 dark:text-blue-400 text-sm mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-600 dark:bg-blue-500 rounded-full shrink-0 animate-pulse" />
            {cleanedHeader}
          </h4>
        );
      } else {
        renderedElements.push(
          <p key={`p-${index}`} className="leading-relaxed text-gray-800 dark:text-slate-200 my-1 text-sm">
            {parseTextWithBold(trimmed)}
          </p>
        );
      }
    }
  });

  flushList(lines.length);

  return <div className="space-y-1">{renderedElements}</div>;
}

export default function ChatHistoryList({ chatHistory, isLoading, isHandover }: ChatHistoryListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
      {chatHistory.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-slate-700">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <p className="text-gray-800 dark:text-slate-100 font-bold text-sm mb-1.5">আসসালামু আলাইকুম!</p>
          <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto">
            ভিসা প্রসেসিং হাব-এ আপনাকে স্বাগতম। ইন্ডিয়ান ভিসা সংক্রান্ত যেকোনো প্রশ্ন আমাদের করতে পারেন।
          </p>
        </div>
      )}
      {chatHistory.map((chat, i) => (
        <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
            chat.role === 'user' 
            ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/5' 
            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-800 shadow-sm'
          }`}>
            {formatMessage(chat.content, chat.role === 'user')}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-sm p-4 rounded-2xl rounded-tl-none">
            <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={18} />
          </div>
        </div>
      )}

      {isHandover && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <UserCheck size={16} className="text-amber-600 dark:text-amber-400" />
          <span className="font-medium">একজন প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।</span>
        </div>
      )}
    </div>
  );
}

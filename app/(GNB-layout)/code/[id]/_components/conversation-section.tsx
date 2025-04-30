import { Conversation } from "@/app/api/dto/code";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./markdown-renderer";

interface ConversationSectionProps {
  conversations: Conversation[];
}

export default function ConversationSection({ conversations }: ConversationSectionProps) {
  const hasNoConv = conversations.length === 0;
  return (
    <div className="space-y-4 border rounded-lg border-line p-6">
      <h3 className="text-lg font-semibold">채팅 목록 {conversations.length}개</h3>
      {hasNoConv ? (
        <div className="h-[232px] flex items-center justify-center text-title-l text-label-alternative">
          채팅 내역이 없습니다.
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {conversations.map((conv) => (
            <AccordionItem key={conv.id} value={conv.id} className="border-b">
              <AccordionTrigger className="py-2 px-4 text-left w-full">{conv.title}</AccordionTrigger>
              <AccordionContent className="p-4">
                <div className="space-y-4 ">
                  {conv.messages.map((msg) => (
                    <div key={msg.id} className={cn(msg.role === "user" ? "" : "flex justify-start")}>
                      <div
                        className={
                          msg.role === "user" ? "bg-blue-100" : "bg-gray-100 text-left p-3 rounded-lg max-w-[80%]"
                        }
                      >
                        <MarkdownRenderer content={msg.content} />
                        <div className="text-xs text-gray-400 mt-1">{new Date(msg.created_at).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

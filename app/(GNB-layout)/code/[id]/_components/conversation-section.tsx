import { Conversation } from "@/app/api/dto/code";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
              <AccordionTrigger>{conv.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {conv.messages.map((msg) => (
                    <div key={msg.id} className={cn(msg.role === "user" ? "flex justify-end" : "flex justify-start")}>
                      <div className="flex gap-3">
                        {msg.role !== "user" && (
                          <Image
                            src="/png/robot.png"
                            width={42}
                            height={42}
                            alt="로봇"
                            className="rounded-full size-[42px]"
                          />
                        )}
                        <div
                          className={
                            msg.role === "user"
                              ? "bg-blue-100 py-2 px-4 rounded-[50px]"
                              : "bg-white text-left py-2 px-4 rounded-[20px] max-w-[80%]"
                          }
                        >
                          <MarkdownRenderer content={msg.content} />
                        </div>
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

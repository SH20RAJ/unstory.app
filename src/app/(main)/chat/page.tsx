import { ChatInterface } from "@/components/chat/ChatInterface";
import { getMessages } from "@/actions/chat";

export default async function ChatPage() {
  const messages = await getMessages();
  // TODO: Get real user ID from Stack Auth
  const currentUserId = "temp-user-id"; 

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 h-full">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight">Campus Chat</h1>
      </div>
      
      <ChatInterface initialMessages={messages} currentUserId={currentUserId} />
    </div>
  );
}

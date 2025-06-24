import banner from "@/assets/chat-banner.svg";

export const ChatBanner = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img src={banner} alt="Chat-Bandge" className="w-[30rem]" />
      <p className="font-semibold w-80 text-lg -translate-y-12 text-center">
        Choose the person to start the conversation.
      </p>
    </div>
  );
};
  
import Card from "@/components/LinkCard";
import { LinkIcon } from "lucide-react";

function Lobby() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <div className="text-center pt-25">
        <h1 className="md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-white-300 to-blue-300 bg-clip-text text-transparent  mb-4">
          Lade deinen Freund ein
        </h1>
        <p className="pt-5 text-xl md:text-xl text-slate-300 font-medium tracking-wide">
          Kopiere den Link und sende es an einen Freund.
        </p>
      </div>

      <div className="mt-30">
        <Card
          Icon={LinkIcon}
          text="Link kopieren"
          link="https://www.npmjs.com/package/socket.io"
        />
      </div>
    </div>
  );
}

export default Lobby;

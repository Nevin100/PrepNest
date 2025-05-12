import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Experts } from "@/services/Options";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const UserDialogInput = ({ children, ExpertList }) => {
  const [selectedExpert, setSelectedExpert] = useState(false);
  const [topic, setTopic] = useState();
  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
  const [loading, setloading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const OnclickNext = async () => {
    setloading(true);
    const result = await createDiscussionRoom({
      topic: topic,
      coachingOption: ExpertList?.name,
      expertName: selectedExpert,
    });
    console.log(result);
    setloading(false);
    setOpenDialog(false);
    router.push("/discussion-room/" + result);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ExpertList?.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <h2 className="font-semibold text-lg">
                  Enter a topic to master your skills in{" "}
                  <span className="text-black font-bold text-lg">
                    {ExpertList?.name}
                  </span>
                </h2>
                <Textarea
                  placeholder="Enter your topic here"
                  className="mt-5 outline-none"
                  onChange={(e) => setTopic(e.target.value)}
                />

                <h2 className="font-semibold text-lg mt-4 mb-3">
                  Select your expert from the following options to master your
                  skills in{" "}
                  <span className="text-black font-bold text-lg">
                    {ExpertList?.name} !!
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 ">
                  {Experts.map((expert, index) => (
                    <div
                      key={index}
                      className={`flex flex-col gap-2 mt-2 justify-between items-center ${selectedExpert === expert?.name && "border-2 border-b-gray-400 p-1 rounded-2xl "}`}
                      onClick={() => setSelectedExpert(expert?.name)}
                    >
                      <Image
                        src={expert?.avatar}
                        alt="expert-avatar"
                        height={100}
                        width={100}
                        className="rounded-2xl h-[80px] w-[80px] object-cover hover:cursor-pointer hover:scale-105 transition-all"
                      />
                      <h2 className="font-semibold text-md">{expert?.name}</h2>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-5 mt-5">
                  <DialogClose asChild>
                    <Button variant={"ghost"}>Cancel</Button>
                  </DialogClose>

                  <Button className="bg-primary" onClick={OnclickNext}>
                    {loading && <LoaderCircle className="animate-spin" />}
                    Next
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDialogInput;

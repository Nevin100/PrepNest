"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Experts } from "@/services/Options";
import Image from "next/image";
import { UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { RealtimeTranscriber } from "assemblyai";

const DiscussionRoom = () => {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });
  const [expert, setExpert] = useState();
  const [enableMicrophone, setMicrophone] = useState(false);
  const recorder = useRef(null);
  const recordRTCInstance = useRef(null); // This will store the class
  let silenceTimeout;

  const realTimeTranscriber = useRef(null);

  const connectToServer = async () => {
    setMicrophone(true);

    //setiing Assembly AI :
    realTimeTranscriber.current = new RealtimeTranscriber({
      token: "",
      sample_rate: 16_000,
    });

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Import RecordRTC dynamically
        const RecordRTCModule = await import("recordrtc");
        const RecordRTCClass = RecordRTCModule.default || RecordRTCModule;

        recordRTCInstance.current = RecordRTCClass; // Save the class

        const newRecorder = new RecordRTCClass(stream, {
          type: "audio",
          mimeType: "audio/webm;codecs=pcm",
          recorderType: RecordRTCClass.StereoAudioRecorder,
          timeSlice: 250,
          desiredSampleRate: 16000,
          numberOfAudioChannels: 1,
          bufferSize: 4096,
          audioBitsPerSecond: 128000,
          ondataavailable: async (blob) => {
            clearTimeout(silenceTimeout);
            const buffer = await blob.arrayBuffer();
            console.log("Audio Buffer:", buffer);
            silenceTimeout = setTimeout(() => {
              console.log("User Stopped Talking");
            }, 2000);
          },
        });

        recorder.current = newRecorder;
        newRecorder.startRecording();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
  };

  //Disconnect the microPhone :
  const disconnect = (e) => {
    e.preventDefault();

    if (recorder.current) {
      recorder.current.stopRecording(() => {
        const internalRecorder = recorder.current.getInternalRecorder?.();
        if (internalRecorder?.stream) {
          internalRecorder.stream.getTracks().forEach((track) => track.stop());
        }
        recorder.current = null;
        setMicrophone(false);
        console.log("Microphone disconnected");
      });
    }
  };

  useEffect(() => {
    // Getting the expert from the discussion room id
    if (DiscussionRoomData) {
      const Expert = Experts.find(
        (item) => item.name === DiscussionRoomData?.expertName
      );
      console.log(Expert);
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  return (
    <div className="-mt-12">
      <h2 className="text-2xl font-bold mb-2">
        {DiscussionRoomData?.coachingOption}
      </h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className=" h-[60vh] bg-gray-400/20 border-2 rounded-4xl flex flex-col items-center justify-center relative">
            {expert?.avatar && (
              <Image
                src={expert?.avatar}
                alt="expert-avatar"
                height={200}
                width={200}
                className="rounded-full w-[80px] h-[80px] object-cover animate-pulse"
              />
            )}
            <h2 className="font-semibold mt-2">{expert?.name}</h2>
            <div className="bg-gray-500/40 p-5 px-10 absolute right-10 bottom-10 rounded-md">
              <UserButton />
            </div>
          </div>

          {/* Connect Button :  */}
          <div className="flex items-center mt-7 justify-center">
            {!enableMicrophone ? (
              <Button
                className="hover:cursor-pointer"
                onClick={connectToServer}
              >
                Connect
              </Button>
            ) : (
              <Button
                className="hover:cursor-pointer"
                variant={"destructive"}
                onClick={disconnect}
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>

        {/* Chat Section  */}
        <div>
          <div className="h-[60vh] bg-secondary border-2 rounded-4xl flex flex-col items-center justify-center relative">
            <h2 className="font-medium ">Chat Section</h2>
          </div>
          <h2 className="mt-3 ml-3 font-semibold text-sm text-gray-400">
            At the end of Conversation we will automatically generate
            feedback/notes fronm your conversation{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom;

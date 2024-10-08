"use client";
import Link from "next/link";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkPreview from "./LinkPreview";
import Image from "next/image";
import { motion } from "framer-motion";
const Post = ({
  title,
  img,
  link,
  description,
  postedBy,
  votes,
  slug,
  createdAt,
  imageURL,
  subredditId,
}) => {
  function convertISOToRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000, // 365 days
      month: 2592000, // 30 days
      week: 604800, // 7 days
      day: 86400, // 1 day
      hour: 3600, // 1 hour
      minute: 60, // 1 minute
      second: 1, // 1 second
    };

    for (const interval in intervals) {
      const count = Math.floor(seconds / intervals[interval]);
      if (count > 0) {
        return count === 1
          ? `${count} ${interval} ago`
          : `${count} ${interval}s ago`;
      }
    }

    return "just now"; // In case the time difference is very small
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
    >
      <div className=" md:w-[800px] w-full my-4  border-b-2 hover:bg-gray-100 bg-white shadow-md  rounded-lg  ">
        {" "}
        <Link href={`/r/${subredditId}/posts/${slug}`}>
          <div className="  p-4  rounded-xl flex flex-col gap-y-3  h-fit py-2 cursor-pointer">
            <div className="text-sm">
              r/{subredditId} • {convertISOToRelativeTime(createdAt)} • Posted
              By <b>{postedBy}</b>
            </div>
            <div className="text-lg font-semibold">{title}</div>

            {description && <div className="text-xl">{description}</div>}
            {link && <LinkPreview link={link} />}
            {imageURL && (
              <div className="flex justify-center relative  max-h-[500px] w-full">
                <Image
                  className="rounded-xl object-contain"
                  src={imageURL}
                  alt={title}
                  width={800}
                  height={500}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </Link>
        <div className="flex gap-x-2   border-2 rounded-full bg-zinc-50 w-fit p-2 border-zinc-500 m-4">
          <div className="group p-1 px-2 rounded-xl   border-black cursor-pointer ">
            <div className="group-hover:hidden">
              <ThumbUpOutlinedIcon />
            </div>
            <div className="hidden group-hover:block">
              <ThumbUpIcon />
            </div>
          </div>
          <div className="p-1 px-2 rounded-xl   border-black cursor-pointer ">
            {votes}
          </div>
          <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
            <ThumbDownOutlinedIcon className="group-hover:hidden" />
            <div className="hidden group-hover:block">
              <ThumbDownIcon />
            </div>
          </div>
          <div className="p-1 px-2 rounded-xl  border-black cursor-pointer pt-2 ">
            <svg
              fill="white"
              height="20"
              viewBox="-2 -2 52 52"
              width="20"
              className=""
            >
              <path
                clipRule="evenodd"
                d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                stroke="black"
                strokeWidth="3"
              ></path>
            </svg>
          </div>
          <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
            <div className="group-hover:hidden">
              <ShareOutlinedIcon />
            </div>
            <div className="hidden group-hover:block">
              <ShareIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Post;

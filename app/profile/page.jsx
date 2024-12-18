import prisma from "@/lib/prisma";
import React from "react";
import Post from "../components/Post";
import { cookies } from "next/headers";
import * as jose from "jose";
import Link from "next/link";
const Profile = async () => {
  const cookieStore = cookies();
  const token =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    return <div>You are not logged in</div>;
  }
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const decoded = await jose.jwtVerify(token, secret);
  const { name, email, picture } = decoded.payload;

  const posts = await prisma.posts.findMany({
    where: {
      postedByEmail: email,
    },
  });

  return (
    <div>
      <div className="h-1 md:h-0"></div>
      <div className="bg-white p-6 rounded-3xl md:max-w-[800px]  my-4 shadow-md mx-2 md:mx-auto ">
        <div className="font-semibold text-3xl mb-4 text-center border-b-2 pb-2">
          Profile
        </div>
        <div className="md:flex items-center gap-x-4">
          <div>
            <img
              src={picture}
              className="rounded-full w-24 h-24 m-auto my-2"
              alt={name}
            />
          </div>
          <div className=" flex flex-col gap-y-4 md:text-xl text-lg">
            <div>Name: {name}</div>
            <div>Email: {email}</div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-3xl mt-8  md:max-w-[800px]   my-4 shadow-md mx-2 md:mx-auto     ">
        <div className="font-semibold text-3xl mb-4 text-center border-b-2 pb-2">
          Posts
        </div>
        {posts.length === 0 && (
          <div className="    bg-white cursor-pointer text-center  text-xl mt-4 ">
            <div className="mb-4"> No Posts Found </div>
            <Link
              className="  bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-md px-4 mt-2 "
              href="/create"
            >
              Create New Post
            </Link>{" "}
          </div>
        )}
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
              link={post.link}
              postedBy={post.postedBy}
              votes={post.votes}
              slug={post.slug}
              createdAt={post.createdAt}
              imageURL={post.imageURL}
              subredditId={post.subredditId}
            />
          ))}
      </div>
    </div>
  );
};

export default Profile;

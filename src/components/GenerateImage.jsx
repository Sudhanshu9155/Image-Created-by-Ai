import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LayoutGrid } from "./ui/layout-grid";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

import { Skeleton } from "./ui/skeleton";

import { useState } from "react";

const cards = [
  {
    id: 1,
    content: "Image 1",
    className: "md:col-span-2 md:row-span-2", // Large card
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    content: "Image 2",
    className: "md:col-span-1 md:row-span-1", // Small card
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    content: "Image 3",
    className: "md:col-span-1 md:row-span-1", // Small card
    thumbnail:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    content: "Image 4",
    className: "md:col-span-1 md:row-span-2", // Tall card
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    content: "Image 5",
    className: "md:col-span-2 md:row-span-1", // Wide card
    thumbnail:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
  },
];

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const handleGenerate = async () => {
    // Logic to generate image based on prompt
    if (!prompt || typeof prompt !== "string" || !(prompt.length > 2)) {
      setError("Please provide a valid prompt.");
      return;
    }
    setIsGenerating(true);
    const modifiedPrompt = `Create an Image for the this prompt: ${prompt}`;
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: modifiedPrompt,
      });

      for (const part of response.candidates[0].content.parts) {
        const imageData = part?.inlineData?.data;
        const image = `data:image/png;base64,${imageData}`;
        if(!imageData){
          continue;
        }

        const newImage = {
          id: Date.now(),
          content: <Content prompt={prompt} imageUrl={image} />,
          className: "md:col-span-1 md:row-span-10",
          thumbnail: image,
        };

        setImages((prevImages) => [newImage, ...prevImages]);
        // setImages([image, ...images])
      }
      console.log(images);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-muted-foreground">
        Generate Image with AI
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Generate realistic images using AI technology.
      </p>

      <div className="flex flex-col items-center gap-4">
        <Textarea
        onKeyDown = {(e) => {
          if(e.ctrlKey && e.key === 'Enter'){
            handleGenerate();
          }
        }}
          placeholder="Write a prompt to generate image"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></Textarea>
        <Button
          disabled={isGenerating || !prompt || !(prompt.length > 2)}
          onClick={handleGenerate}
          className="cursor-pointer"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </Button>
      </div>
      {error && (
        <p className="text-sm font-light px-4 py-3 border border-red-600/60 bg-red-400/5 rounded-lg w-full max-w-2xl">
          {error}
        </p>
      )}
      <div className="w-full h-full p-10">
        {isGenerating ? (
          <ImageSkeleton />
        ) : (
          // <div className="flex flex-wrap p-8">
          //   {
          //     images?.map((image, index) => (
          //       <img
          //         key={index}
          //         src={image}
          //         alt={"image"}
          //         className="size-60"
          //       />
          //     ))
          //   }
          // </div>

          images.length > 0 && <LayoutGrid cards={images} />
        )}
      </div>
    </section>
  );
};

//TODO: isGenerating && !image.thumbnail ? <ImageSkeleton /> : <img />

export default GenerateImage;

const ImageSkeleton = () => {
  return <Skeleton className="h-40 w-40 rounded-md" />;
};

const Content = ({ prompt, imageUrl }) => {
  const downloadImage = (imageUrl, filename = "downloaded_image.png") => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename; // Set the desired file name for the download

    // Append link to body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p>{prompt.trim().slice(0, 20)}</p>
      <Button onClick={() => downloadImage(imageUrl)}>Download Image</Button>
    </div>
  );
};
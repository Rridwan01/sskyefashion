"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Upload, Check } from "lucide-react";
import { createItemRequest } from "@/app/actions/request";

gsap.registerPlugin(ScrollTrigger);

export function RequestPiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".request-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const res = await createItemRequest(formData);
    if (res.success) {
      setStatus("success");
      clearSelectedFile();
    } else {
      setStatus("error");
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="request" ref={containerRef} className="py-24 md:py-32 px-6 bg-background text-foreground flex flex-col items-center text-center transition-colors duration-500 border-t border-foreground/10">
      <div className="max-w-3xl w-full">
        <h2 className="request-reveal font-serif text-4xl md:text-7xl font-light tracking-wide mb-12 uppercase">
          Can’t find it? <br/> We source it.
        </h2>
        <p className="request-reveal font-sans text-sm md:text-base text-foreground/60 mb-24 tracking-[0.1em] max-w-xl mx-auto uppercase leading-relaxed">
          Our global concierge network secures rare runway pieces, sold-out drops, and custom commissions exclusively for our clientele.
        </p>

        <div className="request-reveal relative max-w-xl mx-auto min-h-16">
          {status === "success" ? (
            <div className="absolute inset-0 flex items-center justify-center gap-4 text-green-600 dark:text-green-400 opacity-0 animate-in fade-in duration-1000">
              <Check className="w-6 h-6" />
              <span className="font-sans text-sm tracking-[0.2em] uppercase">Request Received. We will be in touch.</span>
            </div>
          ) : (
            <form 
              action={handleSubmit}
              className="relative flex flex-col items-center w-full border-b border-foreground/30 group transition-colors duration-500 focus-within:border-foreground pb-2"
            >
              <div className="flex items-center w-full h-16">
                <input 
                  type="text" 
                  name="description"
                  required
                  disabled={status === "submitting"}
                  placeholder="Describe the piece you are looking for..." 
                  className="w-full h-full bg-transparent border-none outline-none font-sans text-sm md:text-base placeholder:text-foreground/40 text-foreground disabled:opacity-50"
                />
                
                <input 
                  type="file" 
                  name="image" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />

                <div className="flex items-center gap-6 pr-2">
                  <button 
                    type="button" 
                    onClick={triggerFileInput}
                    disabled={status === "submitting"}
                    className={`transition-colors ${selectedFile ? 'text-amber-500' : 'text-foreground/50 hover:text-foreground'} disabled:opacity-50`}
                    title={selectedFile ? "Change Image" : "Upload Reference Image"}
                  >
                    <Upload className="w-5 h-5 transition-transform hover:-translate-y-1 duration-500" />
                  </button>
                  <button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="text-foreground hover:text-foreground/70 transition-colors disabled:opacity-50"
                  >
                    <ArrowRight className="w-6 h-6 transition-transform hover:translate-x-2 duration-500" />
                  </button>
                </div>
              </div>
              
              {/* Preview overlay */}
              {previewUrl && (
                <div className="flex items-center gap-4 mt-2 w-full bg-foreground/[0.03] p-3 rounded border border-foreground/10 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-foreground/10 shrink-0">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-sans text-xs text-foreground/80 truncate max-w-[200px] md:max-w-sm">{selectedFile?.name}</p>
                    <p className="font-sans text-[10px] text-foreground/40 uppercase tracking-widest mt-0.5">
                      {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={clearSelectedFile}
                    className="text-foreground/40 hover:text-foreground/80 transition-colors text-[10px] uppercase tracking-wider font-medium font-sans border border-foreground/20 px-2.5 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              )}
              
              {/* Animated underline micro-interaction */}
              <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-foreground transition-all duration-700 group-focus-within:w-full" />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import svgPaths from "./imports/svg-7npnatvfdq";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

const LENGTHS = [8, 12, 16,24];

const CHARS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function Copy() {
  return (
    <div className="relative size-[16.8px]" data-name="Copy">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_291)" id="Copy">
          <path
            d={svgPaths.p2ee33200}
            id="Icon"
            stroke="var(--stroke-0, #393C43)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_291">
            <rect fill="white" height="16.8" width="16.8" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FitToWidthText({ 
  text, 
  isDark 
}: { 
  text: string; 
  isDark: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!containerRef.current || !textRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const padding = 32; // Account for padding
      const targetWidth = containerWidth - padding;
      
      // Start with a large font size and measure
      let testSize = 120;
      textRef.current.style.fontSize = `${testSize}px`;
      let textWidth = textRef.current.scrollWidth;
      
      // Calculate the scale needed
      const scale = targetWidth / textWidth;
      const newFontSize = testSize * scale;
      
      setFontSize(newFontSize);
    };

    adjustFontSize();
    
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full">
      <p
        ref={textRef}
        style={{ fontSize: `${fontSize}px` }}
        className={`font-['Work_Sans:Regular',sans-serif] text-nowrap font-normal leading-[0.9] relative shrink-0 text-center tracking-tight whitespace-nowrap transition-colors duration-300 ${
          isDark
            ? "text-[rgba(169,197,234,0.15)]"
            : "text-[rgba(169,197,234,0.4)]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function ScrambleText({
  text,
  isScrambling,
}: {
  text: string;
  isScrambling: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (!isScrambling) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setDisplayText(text);
      startTimeRef.current = null;
      return;
    }

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const duration = 600; // 1 second animation
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate how many characters should be revealed
      const revealCount = Math.floor(progress * text.length);

      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < revealCount) {
              return text[index];
            }
            return chars[
              Math.floor(Math.random() * chars.length)
            ];
          })
          .join(""),
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        rafRef.current = null;
        startTimeRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startTimeRef.current = null;
    };
  }, [text, isScrambling]);

  return <>{displayText}</>;
}

function GgArrowsH({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="relative shrink-0 size-[24px] px-[-6px] py-[0px] mx-[6px] my-[0px]"
      data-name="gg:arrows-h"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="gg:arrows-h">
          <path
            d={svgPaths.p37f7af00}
            fill={isDark ? "#ffffff" : "black"}
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function CarbonArrayNumbers({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="carbon:array-numbers"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="carbon:array-numbers">
          <path
            d={svgPaths.p249bea80}
            fill={isDark ? "#ffffff" : "black"}
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function MaterialSymbolsAbc({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="absolute left-0 size-[24px] top-0"
      data-name="material-symbols:abc"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="material-symbols:abc">
          <path
            d={svgPaths.p105f9780}
            fill={isDark ? "#ffffff" : "black"}
            id="Vector"
          />
          <path
            d={svgPaths.pb4ccb00}
            fill={isDark ? "#ffffff" : "black"}
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Solid08CheckSquare() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="Solid/08 check square"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Solid/08 check square">
          <path
            clipRule="evenodd"
            d={svgPaths.p6201200}
            fill="var(--fill-0, #F97316)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Solid08Square({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg
        className="block size-full"
        fill="none"
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke={isDark ? "#6b7280" : "#d1d5db"}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function PasswordGeneratorApp() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(32);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);

  const generatePassword = () => {
    let charset = CHARS.lowercase + CHARS.uppercase;
    if (includeNumbers) charset += CHARS.numbers;
    if (includeSymbols) charset += CHARS.symbols;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(
        Math.floor(Math.random() * charset.length),
      );
    }

    setIsScrambling(true);
    setPassword(newPassword);
    setTimeout(() => setIsScrambling(false), 1000);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols]);

  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(password);
        toast.success("Password copied to clipboard!");
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      // Fallback method using textarea
      try {
        const textarea = document.createElement("textarea");
        textarea.value = password;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (successful) {
          toast.success("Password copied to clipboard!");
        } else {
          toast.error("Failed to copy password");
        }
      } catch (fallbackErr) {
        toast.error(
          "Could not copy password. Please select and copy manually.",
        );
      }
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 ${isDark ? "bg-[#111214]" : "bg-[#f6f7f9]"}`}
      data-name="Password Generator UI"
    >
      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 rounded-full transition-colors z-10 ${
          isDark
            ? "bg-[#2a2d31] text-white hover:bg-[#3a3d41]"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }`}
      >
        {isDark ? (
          <Sun className="size-5 md:size-6" />
        ) : (
          <Moon className="size-5 md:size-6" />
        )}
      </button>

      <div className="flex flex-col items-center min-h-screen w-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between px-4 md:px-8 lg:px-[32px] py-6 md:py-8 lg:py-[41px] relative w-full min-h-screen">
          {/* Title */}
          <FitToWidthText text="Password Generator" isDark={isDark} />

          {/* Main content */}
          <div className="content-stretch flex flex-col gap-4 md:gap-6 lg:gap-[10px] items-center justify-center relative shrink-0 w-full">
            {/* Password display */}
            <div
              className="flex items-center justify-center relative shrink-0 w-full max-w-[999px] group cursor-pointer px-2 py-4"
              onMouseEnter={() => setShowCopyButton(true)}
              onMouseLeave={() => setShowCopyButton(false)}
              onClick={handleCopy}
            >
              <div className="relative inline-block">
                <p
                  className={`font-['General_Sans:Regular',sans-serif] leading-normal not-italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[120px] 2xl:text-[174px] text-center break-all transition-colors duration-300 ${
                    isDark
                      ? "text-[rgba(255,255,255,0.4)]"
                      : "text-[rgba(17,18,20,0.25)]"
                  }`}
                >
                  <ScrambleText
                    text={password}
                    isScrambling={isScrambling}
                  />
                </p>

                {/* Copy button */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-90 box-border content-stretch flex gap-[7px] items-start overflow-clip px-3 md:px-[16.8px] py-2 md:py-[11.2px] rounded-full md:rounded-[22.4px] transition-opacity duration-200 ${
                    isDark ? "bg-[#2a2d31]" : "bg-[#f3f3f4]"
                  } ${showCopyButton ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="content-stretch flex gap-2 md:gap-[8.4px] items-center relative shrink-0">
                    <div className="content-stretch flex flex-col gap-[2.8px] items-start relative shrink-0">
                      <p
                        className={`font-['Work_Sans:SemiBold',sans-serif] font-semibold leading-[15.4px] relative shrink-0 text-[11.2px] text-nowrap tracking-[-0.0672px] whitespace-pre ${
                          isDark
                            ? "text-white"
                            : "text-[#393c43]"
                        }`}
                      >
                        Copy
                      </p>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                        <Copy />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="content-stretch flex rounded-md flex-col lg:flex-row gap-4 lg:gap-[16px] items-center justify-center relative shrink-0">
              {/* Length selector */}
              <div
                className={`box-border rounded-2xl gap-3 content-stretch flex items-center pl-3 md:pl-4 pr-2 md:pr-[8px] rounded-4xl py-2 md:py-[8px] relative shrink-0 lg:w-auto justify-center ${
                  isDark
                    ? "bg-[rgba(255,255,255,0.08)]"
                    : "bg-[rgba(118,118,128,0.12)]"
                }`}
              >
                <div className="shrink-0 hidden sm:block">
                  <GgArrowsH isDark={isDark} />
                </div>
                <div className="flex gap-1 overflow-x-visible fit-content">
                  {LENGTHS.map((len) => (
                    <button
                      key={len}
                      onClick={() => setLength(len)}
                      className={`content-stretch flex items-center justify-center relative rounded md:rounded-[16px] shrink-0 size-12 sm:size-14 md:size-[64px] transition-all ${
                        length === len
                          ? "bg-orange-500 box-border overflow-clip rounded-2xl md:rounded-[21px] shadow-[0px_0px_0px_4px_rgba(249,115,22,0.25)]"
                          : ""
                      }`}
                    >
                      <p
                        className={`font-['Work_Sans:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-base md:text-[20px] text-center text-nowrap tracking-[-0.14px] whitespace-pre ${
                          length === len
                            ? "text-white"
                            : isDark
                              ? "text-[#6b7280]"
                              : "text-[#aeaeb2]"
                        }`}
                      >
                        {len}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Character set options */}
              <div className="content-stretch flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-[16px] items-center justify-center relative shrink-0 w-full lg:w-auto">
                {/* Numbers option */}
                <button
                  onClick={() =>
                    setIncludeNumbers(!includeNumbers)
                  }
                  className={`box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip p-3 md:p-[16px] relative rounded-2xl md:rounded-[19px] shrink-0 w-full sm:w-[343px] transition-all ${
                    isDark ? "bg-[#1a1c1e]" : "bg-[#f3f3f4]"
                  } ${includeNumbers ? "" : ""}`}
                >
                  <div className="content-stretch flex gap-3 md:gap-[16px] items-center relative shrink-0 w-full">
                    <div className="basis-0 content-stretch flex gap-2 md:gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                      <div className="shrink-0 hidden sm:block">
                        <CarbonArrayNumbers isDark={isDark} />
                      </div>
                      <p
                        className={`font-['Work_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-sm md:text-[16px] text-nowrap tracking-[-0.096px] whitespace-pre ${
                          isDark
                            ? "text-white"
                            : "text-[#111214]"
                        }`}
                      >
                        I want numbers in there!
                      </p>
                    </div>
                    {includeNumbers ? (
                      <Solid08CheckSquare />
                    ) : (
                      <Solid08Square isDark={isDark} />
                    )}
                  </div>
                </button>

                {/* Symbols option */}
                <button
                  onClick={() =>
                    setIncludeSymbols(!includeSymbols)
                  }
                  className={`relative rounded-2xl md:rounded-[19px] shrink-0 w-full sm:w-[343px] transition-all ${
                    isDark ? "bg-[#1a1c1e]" : "bg-[#f3f3f4]"
                  }`}
                >
                  <div className="box-border content-stretch flex flex-col gap-2.5 items-start overflow-clip p-3 md:p-[16px] relative rounded-[inherit] w-full">
                    <div className="content-stretch flex gap-3 md:gap-[16px] items-center relative shrink-0 w-full">
                      <div className="basis-0 content-stretch flex gap-2 md:gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                        <div className="relative shrink-0 size-[24px] hidden sm:block">
                          <MaterialSymbolsAbc isDark={isDark} />
                        </div>
                        <p
                          className={`font-['Work_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-sm md:text-[16px] text-nowrap tracking-[-0.096px] whitespace-pre ${
                            isDark
                              ? "text-white"
                              : "text-[#111214]"
                          }`}
                        >
                          Make it more secure
                        </p>
                      </div>
                      {includeSymbols ? (
                        <Solid08CheckSquare />
                      ) : (
                        <Solid08Square isDark={isDark} />
                      )}
                    </div>
                  </div>
                  {includeSymbols && (
                    <div
                      aria-hidden="true"
                      className="absolute border border-orange-500 border-solid inset-0 pointer-events-none rounded-2xl md:rounded-[19px] shadow-[0px_0px_0px_4px_rgba(249,115,22,0.25)]"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="content-stretch flex gap-2 md:gap-[8px] items-center relative shrink-0">
            <p
              className={`font-['Work_Sans:Regular',sans-serif] font-normal leading-normal relative shrink-0 text-md sm:text-2xl md:text-[24px] text-center whitespace-pre transition-colors duration-300 ${
                isDark
                  ? "text-[rgba(255,255,255,0.5)]"
                  : "text-[rgba(17,18,20,0.5)]"
              }`}
            >
              <span>Made By </span>
              <span
                className={`font-['Work_Sans:Medium',sans-serif] font-medium ${
                  isDark ? "text-white" : "text-[#111214]"
                }`}
              >
                Shivangi
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
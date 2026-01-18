import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Props {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

export const CameraView: React.FC<Props> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            onCapture(dataUrl);
        }
    } else if (hasPermission === false) {
        // Fallback capture for demo if camera denied
        onCapture("https://lh3.googleusercontent.com/aida-public/AB6AXuCeeia82iqyKPsa4tMAiBlGzkcVrUpQFd871-1YAyCTNMtwsbMe7jDlua_A0hsmwCdxUlHuQRKf9RmIzcmCY956le_LuWInX1X-p8sgrMvybO4fUqKUNmbr_oqAkjJQker9fLETnjihuC7fjx072KK2elRg5jaaSffV0ErBrEflc3o9icraVsrWVSZFVKsAqu77bcSEeODPuwpO1TkiwJl_SMZzi-vimqu3r1uHldiIaKxiDOMseXISrDIxBw89UX3WJqE5MPGxHxqZ");
    }
  }, [hasPermission, onCapture]);

  return (
    <div className="relative h-screen w-full flex flex-col bg-stone-900 overflow-hidden z-50">
      {/* Viewfinder Layer */}
      <div className="absolute inset-0 z-0">
        {hasPermission ? (
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
            />
        ) : (
            <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA55hoUm7I4m6Vfo2-4-p_nJ7i954QxPI0iR69e_fTDMu3G0F0bbzH5AR7KEl52ckmySw-dBjEsP2gdXDC6axssm5l_ppoiMe7fVj1u-WZO5thHnVNVLYHBnVpV2vmctUzJAyhcwN8O1pQ29OdxMUCRD53kuC7fk9yoydQwAimLy--A1drOzfKNTyVGJX7kxdPFOtitlKGOwi9IPuy_Qm15JwzmQsNMiqoYNl0Jf4t6SOYntJpsQRwfaqFreOxFEQ4Y6Sqz59NcZHd3")' }}
            />
        )}
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 pb-8 safe-area-inset">
        {/* Top Controls */}
        <div className="flex items-start justify-between pt-2">
            <button onClick={onClose} className="group w-12 h-12 rounded-full flex items-center justify-center bg-white/25 backdrop-blur-md border border-white/30 text-white transition active:scale-95 hover:bg-white/30">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>close</span>
            </button>
            <div className="animate-pulse-slow mx-auto mt-2 hidden sm:flex items-center gap-2 rounded-full bg-secondary/90 px-4 py-2 text-xs font-bold text-surface-dark shadow-sm backdrop-blur-md">
                <span className="material-symbols-outlined text-yellow-700" style={{ fontSize: '16px' }}>light_mode</span>
                <span>Good lighting helps!</span>
            </div>
            <button className="group w-12 h-12 rounded-full flex items-center justify-center bg-white/25 backdrop-blur-md border border-white/30 text-white transition active:scale-95 hover:bg-white/30">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>flash_off</span>
            </button>
        </div>

        {/* Focus Frame */}
        <div className="flex flex-1 flex-col items-center justify-center pointer-events-none">
            <div className="relative flex aspect-square w-72 max-w-[80%] flex-col items-center justify-center">
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 shadow-[0_0_20px_rgba(170,190,157,0.2)]"></div>
                {/* Corners */}
                <div className="absolute top-[-2px] left-[-2px] w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                <div className="absolute top-[-2px] right-[-2px] w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                <div className="absolute bottom-[-2px] left-[-2px] w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                <div className="absolute bottom-[-2px] right-[-2px] w-5 h-5 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                {/* Scanner Line */}
                <div className="absolute w-full h-0.5 bg-primary/80 shadow-[0_0_10px_#aabe9d] animate-[bounce_3s_infinite]"></div>
            </div>
            <p className="mt-6 rounded-xl bg-black/40 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur-md">
                Place food within the frame
            </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex w-full items-center justify-between px-2">
            <div className="flex w-20 justify-start">
                <button className="relative w-14 h-14 overflow-hidden rounded-xl border-2 border-white/50 bg-stone-800 transition active:scale-95 hover:border-white">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqdRGjqg8cFnpAVYy_AUmzvU0W0lM-SF4E6mdkFpySEqZlsNdkYE9nuoiTNVx9keTdtumgawulMMjIkte7NGQWMbNXHU9_jvIpnpOhjQ6_ApbiCyoTvXo_g0i1FLr4-D4KftuJk2Jk6H021NNAaMGYPATRGV5bZQ72cw98crg-dVpRljQPhPXkTfUfHwBTzwN9bkR0N2i3R5G20r7hFn24PJaE0MyFcYWGpBvzGYZqNwqNJ7VItK_P8uW3_TCk_W88o_kN1KQ3YdHv")' }}></div>
                </button>
            </div>
            
            <div className="flex items-center justify-center">
                <button onClick={handleCapture} className="group relative flex w-24 h-24 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-sm transition-transform active:scale-95">
                    <div className="absolute inset-0 rounded-full border-[6px] border-primary opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(170,190,157,0.6)] transition-all"></div>
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm transition-all group-active:scale-90 group-active:bg-secondary"></div>
                </button>
            </div>

            <div className="flex w-20 justify-end">
                <button className="w-14 h-14 rounded-full flex flex-col items-center justify-center gap-1 bg-white/25 backdrop-blur-md border border-white/30 text-white transition active:scale-95 hover:bg-white/30">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>keyboard</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Type</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

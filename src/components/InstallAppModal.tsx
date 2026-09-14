import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  X,
  ExternalLink,
  Laptop,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderArchive,
  Layers,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop' | 'source_code'>('mobile');

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      alert(
        'Apne mobile browser me top right 3 dots (⋮) par click karein aur "Install App" ya "Add to Home screen" select karein!'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#10121A] border border-[#23273D] rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1D2B] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl ig-gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/25 flex-shrink-0">
            <InstagramIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Download & Install Application</h3>
            <p className="text-xs text-gray-400">
              Apne mobile ya computer me is app ko ek real application ki tarah install karein.
            </p>
          </div>
        </div>

        {/* Direct Install CTA Button */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-white block">
              Direct App Installation (PWA)
            </span>
            <span className="text-[11px] text-gray-300">
              Bina kisi Play Store ke turant mobile home screen par app icon ban jayega.
            </span>
          </div>

          <button
            onClick={handleInstallClick}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/25 transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isInstalled ? 'App Installed ✓' : 'Install on Phone / PC'}</span>
          </button>
        </div>

        {/* Device Tabs */}
        <div className="flex border-b border-[#23273D] gap-2">
          <button
            onClick={() => setActiveTab('mobile')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'mobile'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android / iPhone (Mobile)</span>
          </button>

          <button
            onClick={() => setActiveTab('desktop')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'desktop'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>PC / Chrome (Desktop)</span>
          </button>

          <button
            onClick={() => setActiveTab('source_code')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'source_code'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>Export ZIP / APK</span>
          </button>
        </div>

        {/* Tab 1: Mobile instructions */}
        {activeTab === 'mobile' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-xs">Android Phone me Install karne ka tarika:</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white">Chrome Browser me App link open karein</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Link: <code className="text-pink-300">ais-pre-suxcyujavtgwdbmx4xqio4-551994617725.asia-southeast1.run.app</code>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white">Top Right me 3 dots (⋮) menu par click karein</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Chrome browser ke upar daayein kone mein 3 vertical dots dikhenge.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white">"Install app" ya "Add to Home screen" select karein</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Is par tap karte hi aapke phone ke app drawer aur home screen par Instagram Growth AI ka app icon add ho jayega!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Desktop instructions */}
        {activeTab === 'desktop' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-xs">Computer / Laptop me Install karne ka tarika:</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white">Chrome address bar me "Install" icon dekhein</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    URL bar ke right side mein ek chota computer + download icon dikhega.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white">"Install" button par click karein</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    App alag standalone window mein khul jayegi aur Desktop par shortcut ban jayega.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Source Code & APK Export */}
        {activeTab === 'source_code' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-xs">Full Code & Project Export:</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <FolderArchive className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Export as ZIP (Google AI Studio)</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    AI Studio interface ke top menu ya Settings me jakar <strong>"Export ZIP"</strong> par click karein. Isse poori source code aapke computer me download ho jayegi.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] border border-[#242940] flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Push to GitHub</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Aap is poore code ko directly apne GitHub repository me push kar sakte hain aur Vercel/Netlify par 1 click me custom domain par host kar sakte hain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#23273D]">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <div className="w-5 h-5 rounded-md ig-gradient-bg flex items-center justify-center font-bold text-white text-[9px]">
              MK
            </div>
            <span>
              Engineered & Owned by <strong className="text-white font-semibold">Mohd Kasim</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#1A1D2B] hover:bg-[#252A3D] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

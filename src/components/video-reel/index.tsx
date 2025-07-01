import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface VideoReelProps {
  videoUrl: string;
  title: string;
  description: string;
  onClose?: () => void;
}

// Helper function to convert Google Drive sharing URLs to direct embed URLs
const getGoogleDriveEmbedUrl = (url: string): string => {
  // Check if it's already a direct embed URL
  if (url.includes('preview')) {
    return url;
  }
  
  // Extract the file ID from Google Drive link patterns
  let fileId = '';
  
  // Pattern: https://drive.google.com/file/d/{fileId}/view
  if (url.includes('/file/d/')) {
    fileId = url.split('/file/d/')[1].split('/')[0];
  } 
  // Pattern: https://drive.google.com/open?id={fileId}
  else if (url.includes('open?id=')) {
    fileId = url.split('open?id=')[1].split('&')[0];
  }
  // Pattern: https://drive.google.com/drive/folders/{fileId}
  else if (url.includes('/drive/folders/')) {
    fileId = url.split('/drive/folders/')[1].split('?')[0].split('/')[0];
  }
  
  // Return embed URL if we have a file ID
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Return original URL if we couldn't parse it
  return url;
};

export const VideoReel: React.FC<VideoReelProps> = ({ videoUrl, title, description, onClose }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = getGoogleDriveEmbedUrl(videoUrl);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Note: Controlling iframe video playback directly is limited due to cross-origin restrictions
    // This is more of a visual state indicator
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Note: Same limitation applies to muting as with play/pause
  };
  
  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (onClose) onClose();
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  
  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-black"
      {...handlers}
    >
      {/* Video container */}
      <div className="relative w-full h-full">
        <iframe
          ref={videoRef}
          src={`${embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        />
        
        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-lg font-bold">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
            
            {/* Control buttons */}
            <div className="flex items-center gap-4 mt-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="text-white"
              >
                <Icon 
                  icon={isPlaying ? "lucide:pause" : "lucide:play"} 
                  className="text-2xl"
                />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleMuteToggle}
                className="text-white"
              >
                <Icon 
                  icon={isMuted ? "lucide:volume-x" : "lucide:volume-2"} 
                  className="text-2xl"
                />
              </motion.button>
              
              {onClose && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white ml-auto"
                >
                  <Icon icon="lucide:x" className="text-2xl" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Swipe indicator */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <div className="bg-white/30 h-1 w-16 rounded-full"></div>
      </div>
    </div>
  );
};

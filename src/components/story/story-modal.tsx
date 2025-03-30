import React from 'react';
import { Modal, ModalContent, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { StoryProgress } from './story-progress';
import type { Story } from '../../types/portfolio';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
  markStoryAsSeen: (storyId: string) => void; // Add the callback prop
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  stories,
  initialStoryIndex,
  markStoryAsSeen, // Destructure the callback prop
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Reset indices when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStoryIndex(initialStoryIndex);
      setCurrentItemIndex(0);
    }
  }, [isOpen, initialStoryIndex]);

  // Safely access current story and item
  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items?.[currentItemIndex];

  const handleNext = React.useCallback(() => {
    if (!currentStory) return;

    if (currentItemIndex < currentStory.items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      const nextStoryIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextStoryIndex);
      setCurrentItemIndex(0);

      // Mark the next story as seen
      markStoryAsSeen(stories[nextStoryIndex].id);
    } else {
      onClose();
    }
  }, [currentItemIndex, currentStoryIndex, currentStory, stories, markStoryAsSeen, onClose]);

  const handlePrevious = React.useCallback(() => {
    if (!currentStory) return;

    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
    } else if (currentStoryIndex > 0) {
      const previousStoryIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(previousStoryIndex);
      const previousStory = stories[previousStoryIndex];
      setCurrentItemIndex(previousStory.items.length - 1);
    }
  }, [currentItemIndex, currentStoryIndex, currentStory, stories]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleNext, handlePrevious, onClose, isOpen]);

  // If no stories or current story is undefined, don't render the modal
  if (!stories.length || !currentStory) {
    return null;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      hideCloseButton
      size="xl"
      classNames={{
        base: "bg-black",
        wrapper: "items-center"
      }}
    >
      <ModalContent>
        {() => (
          <div className="relative h-[60vh] bg-black text-white">
            {/* Top Section: Story Header and Progress */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon icon={currentStory.icon} className="text-xl text-white" />
                  </div>
                  <span className="text-sm font-medium">{currentStory.title}</span>
                </div>
              </div>
              <StoryProgress
                total={currentStory.items.length}
                current={currentItemIndex}
                duration={currentItem?.duration || 5000}
                isPaused={isPaused}
                onComplete={handleNext}
              />
            </div>

            {/* Content Section */}
            <div 
              className="absolute inset-0 flex items-start justify-start p-4 pt-20" // Added `pt-20` to add padding to the top
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="whitespace-pre-wrap text-left text-lg">
                {currentItem?.content}
              </div>
            </div>

            {/* Left half for previous */}
            <div 
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
              onClick={handlePrevious}
              aria-label="Go to previous story" // Add an accessible label
              role="button" // Ensure it is recognized as an interactive element
              tabIndex={0} // Make it focusable
            />

            {/* Right half for next */}
            <div 
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
              onClick={handleNext}
              aria-label="Go to next story" // Add an accessible label
              role="button" // Ensure it is recognized as an interactive element
              tabIndex={0} // Make it focusable
            />

            <Button
              isIconOnly
              variant="light"
              className="absolute right-4 top-4 z-20"
              onPress={onClose}
              aria-label="Close story modal" // Add an accessible label
            >
              <Icon icon="lucide:x" className="text-xl" />
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

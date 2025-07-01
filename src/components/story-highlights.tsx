import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { StoryModal } from './story/story-modal';
import type { Story } from '../types/portfolio';
import { storyHighlights } from '../data/portfolio-data';

export const StoryHighlights = () => {
  const { t } = useTranslation();
  const [selectedStoryIndex, setSelectedStoryIndex] = React.useState<number>(-1);
  const [seenStories, setSeenStories] = React.useState<Set<string>>(new Set());

  // Dynamically generate stories using `storyHighlights` for icons and translation for titles/items
  const stories: Story[] = storyHighlights.map((highlight) => {
    const translatedStory = t(`stories.${highlight.id}`, { returnObjects: true }) as {
      title: string;
      items: string[];
    };

    return {
      id: highlight.id,
      title: translatedStory.title, // Use translated title
      icon: highlight.icon, // Use icon from `storyHighlights`
      seen: seenStories.has(highlight.id),
      items: translatedStory.items.map((item: string, index: number) => ({
        id: `${highlight.id}-${index}`,
        content: item,
        duration: 5000,
      })),
    };
  });

  const handleStoryClick = (index: number) => {
    const storyId = stories[index].id;

    // Mark the clicked story as seen
    setSeenStories((prev) => new Set([...prev, storyId]));

    // Open the story modal
    setSelectedStoryIndex(index);
  };

  const handleStoryClose = () => {
    setSelectedStoryIndex(-1);
  };

  // Callback to mark a story as seen (used by StoryModal)
  const markStoryAsSeen = (storyId: string) => {
    setSeenStories((prev) => new Set([...prev, storyId]));
  };

  return (
    <>
      <div className="custom-scrollbar overflow-x-auto">
        <div className="flex gap-4 overflow-x-auto py-6 px-4 bg-content1 rounded-lg mt-6">
          {stories.map((story, index) => (
            <Button
              isIconOnly
              className="relative w-20 h-20 min-w-[5rem] group"
              variant="light"
              onPress={() => handleStoryClick(index)}
              key={story.id}
              aria-label={`Open story: ${story.title}`} // Add an accessible label
            >
              <div
                className={`absolute inset-[2px] bg-content1 rounded-full flex items-center justify-center ${
                  story.seen
                    ? 'bg-default-200'
                    : 'absolute inset-0 bg-gradient-to-tr from-[#833ab4] via-[#c13584] to-[#f77737] rounded-full opacity-80 group-hover:opacity-100 transition-opacity'
                }`}
              />
              <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Icon icon={story.icon} className="text-2xl mb-1" />
                  {/* Use translation for the title */}
                  <span className="text-tiny">{story.title}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <StoryModal
        isOpen={selectedStoryIndex >= 0}
        onClose={handleStoryClose}
        stories={stories}
        initialStoryIndex={selectedStoryIndex}
        markStoryAsSeen={markStoryAsSeen} // Pass the callback to StoryModal
      />
    </>
  );
};

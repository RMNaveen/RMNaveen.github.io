import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';
import { HeroUIProvider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { portfolioPosts } from '../data/portfolio-data';
import type { PortfolioPost } from '../types/portfolio';

export const PortfolioGrid = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Initialize likes state from portfolioPosts
  const [likes, setLikes] = React.useState<Record<string, number>>(() => {
    return portfolioPosts.reduce((acc, post) => ({
      ...acc,
      [post.id]: post.likes || 0 // Use likes from portfolioPosts
    }), {});
  });

  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const [comments, setComments] = React.useState<Record<string, string[]>>({});
  const [activeComment, setActiveComment] = React.useState<string>('');
  const [showComments, setShowComments] = React.useState<Record<string, boolean>>({});
  const [loadedVideos, setLoadedVideos] = React.useState<Record<string, boolean>>({});
  const [autoPlayTriggered, setAutoPlayTriggered] = React.useState<boolean>(false);
  const [videoHighlight, setVideoHighlight] = React.useState<boolean>(false);
  const [showHelper, setShowHelper] = React.useState<Record<string, boolean>>({});
  
  // Function to scroll to a post
  const scrollToPost = (postId: string) => {
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Auto-play the first video after a delay
  React.useEffect(() => {
    // Find the first video post
    const videoPost = portfolioPosts.find(post => post.mediaType === 'video');
    
    if (videoPost && !autoPlayTriggered) {
      // First highlight the video card to draw attention
      const highlightTimer = setTimeout(() => {
        setVideoHighlight(true);
        scrollToPost(videoPost.id);
      }, 1500); // 1.5 seconds delay for highlight
      
      // Then set a timeout to auto-play the video 
      const playTimer = setTimeout(() => {
        setLoadedVideos(prev => ({
          ...prev,
          [videoPost.id]: true
        }));
        setAutoPlayTriggered(true);
        // Reset highlight after video starts
        setTimeout(() => setVideoHighlight(false), 1000);
      }, 3000); // 3 seconds total delay before play
      
      return () => {
        clearTimeout(highlightTimer);
        clearTimeout(playTimer);
      };
    }
  }, [autoPlayTriggered]);

  // Video handling functions
  const handleVideoLoad = (postId: string) => {
    setLoadedVideos(prev => ({
      ...prev,
      [postId]: true
    }));
    
    // Show helper text
    setShowHelper(prev => ({
      ...prev,
      [postId]: true
    }));
    
    // Hide helper text after 5 seconds
    setTimeout(() => {
      setShowHelper(prev => ({
        ...prev,
        [postId]: false
      }));
    }, 5000);
  };

  const handleVideoClick = (postId: string) => {
    if (!loadedVideos[postId]) {
      setLoadedVideos(prev => ({
        ...prev,
        [postId]: true
      }));
    }
  };

  const handleLike = (id: string) => {
    setLikedPosts(prev => {
      const newLikedPosts = { ...prev };
      newLikedPosts[id] = !prev[id];
      return newLikedPosts;
    });

    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + (likedPosts[id] ? -1 : 1)
    }));
  };

  const handleComment = (id: string) => {
    if (activeComment.trim()) {
      setComments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), activeComment]
      }));
      setActiveComment('');
    }
  };

  const toggleComments = (id: string) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePostClick = (post: PortfolioPost) => {
    // If it's a video post, don't do anything as the video is already interactive
    if (post.mediaType === 'video') {
      handleVideoClick(post.id);
      return;
    }
    
    // Otherwise, if there's a GitHub link, open it
    if (post.githubLink) {
      window.open(post.githubLink, '_blank');
    }
  };

  const formatLikes = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Enhanced function to handle Google Drive embedding
  const getEmbedUrl = (driveUrl: string): string => {
    // Check if it's a Google Drive URL
    if (driveUrl && driveUrl.includes('drive.google.com')) {
      // Extract the file ID from the URL
      let fileId = '';
      
      // Format: https://drive.google.com/file/d/FILE_ID/view
      if (driveUrl.includes('/file/d/')) {
        const segments = driveUrl.split('/file/d/');
        if (segments.length > 1) {
          fileId = segments[1].split('/')[0].split('?')[0];
        }
      }
      // Format: https://drive.google.com/open?id=FILE_ID
      else if (driveUrl.includes('open?id=')) {
        const match = driveUrl.match(/[?&]id=([^&]+)/);
        if (match && match[1]) {
          fileId = match[1];
        }
      }
      
      if (fileId) {
        // Use the embed URL format for Google Drive
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    
    // If not a recognized video URL, return the original
    return driveUrl || '';
  };

  return (
    <HeroUIProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {portfolioPosts.map((post) => (
          <Card
            key={post.id}
            id={`post-${post.id}`}
            isPressable={false}
            isHoverable
            className={`flex flex-col ${videoHighlight && post.mediaType === 'video' ? 'ring-4 ring-primary-500 ring-offset-4 ring-offset-background transform scale-105 shadow-xl transition-all duration-1000' : ''}`}
          >
            <CardBody
              className="p-0 flex-none cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <div className="relative group">
                {post.mediaType === 'video' ? (
                  <div className="w-full aspect-square relative bg-black overflow-hidden">
                    {/* Video Display - either placeholder or iframe */}
                    {!loadedVideos[post.id] ? (
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => handleVideoClick(post.id)}
                      >
                        {/* Use custom thumbnail if available, otherwise use gradient background */}
                        {post.thumbnail ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={post.thumbnail} 
                              alt={t(`portfolio.posts.${post.id}.title`, post.title)} 
                              className="w-full h-full object-cover brightness-75 hover:brightness-50 transition-all"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-primary-900/60 via-primary-800/40 to-black/70 hover:from-primary-800/50 hover:to-black/60 transition-all duration-300">
                              {/* Barney Stinson-inspired text */}
                              <div className="mb-3 text-center">
                                <div className="text-3xl font-bold text-white tracking-wide drop-shadow-lg transform hover:scale-105 transition-all">
                                  Have You Met
                                </div>
                                <div className="mt-1 text-4xl font-extrabold text-yellow-400 drop-shadow-lg tracking-widest transform hover:scale-110 transition-all duration-500">
                                  NAVEEN?
                                </div>
                              </div>

                              <div className="bg-yellow-600/90 rounded-full p-5 transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30 mt-2">
                                <Icon 
                                  icon="mdi:suit-tie" 
                                  className="text-4xl text-white"
                                />
                              </div>
                              
                              {/* Legendary badge */}
                              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-md transform -rotate-12">
                                <span>LEGENDARY</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary-900/40 to-black/60">
                            <Icon 
                              icon="lucide:play-circle" 
                              className="text-6xl text-white opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <span className="mt-2 text-white text-sm">
                              {t(`portfolio.posts.${post.id}.title`, post.title)}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* For Google Drive videos, create a two-step approach */}
                        {post.video && post.video.includes('drive.google.com') ? (
                          <div className="w-full h-full relative">
                            <iframe 
                              src={getEmbedUrl(post.video || '')} 
                              className="w-full h-full border-0 opacity-100 animate-fadeIn" 
                              allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                              allowFullScreen
                              loading="eager"
                              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                              title={t(`portfolio.posts.${post.id}.title`, post.title)}
                              onLoad={() => {
                                handleVideoLoad(post.id);
                                // Try to force focus on the iframe to help with autoplay
                                setTimeout(() => {
                                  const iframe = document.querySelector(`#post-${post.id} iframe`);
                                  if (iframe) {
                                    (iframe as HTMLElement).focus();
                                    try {
                                      // Simulate a click on the iframe
                                      (iframe as HTMLElement).click();
                                    } catch (e) {
                                      console.log('Cannot simulate click: ', e);
                                    }
                                  }
                                }, 1000);
                              }}
                            />
                            {/* Overlay helper text to guide user - fades out after 5 seconds */}
                            {showHelper[post.id] !== false && (
                              <div className={`absolute bottom-4 left-0 right-0 flex justify-center transition-opacity duration-1000 ${showHelper[post.id] ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="bg-yellow-600/80 text-white text-xs font-medium px-4 py-2 rounded-md shadow-md animate-pulse">
                                  <span className="tracking-wide">SUIT UP & CLICK TO PLAY</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* For other videos, use standard iframe */
                          <iframe 
                            src={getEmbedUrl(post.video || '')} 
                            className="w-full h-full border-0 opacity-0 animate-fadeIn" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={t(`portfolio.posts.${post.id}.title`, post.title)}
                            onLoad={() => handleVideoLoad(post.id)}
                          />
                        )}
                      </>
                    )}
                    
                    {/* Video Label */}
                    <div className="absolute top-2 right-2 bg-yellow-600 text-black text-xs px-3 py-1.5 rounded-md flex items-center gap-1 font-bold shadow-md transform -rotate-3">
                      <Icon icon="lucide:video" className="text-sm" />
                      <span>AWESOME</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={post.image}
                      alt={t(`portfolio.posts.${post.id}.title`, post.title)}
                      className="w-full aspect-square object-cover"
                      classNames={{
                        img: "brightness-90 group-hover:brightness-50 transition-all"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-center p-4">
                        <h3 className="text-lg font-bold mb-2">
                          {t(`portfolio.posts.${post.id}.title`, post.title)}
                        </h3>
                        <p className="text-sm">
                          {t(`portfolio.posts.${post.id}.description`, post.description)}
                        </p>
                        {post.githubLink && (
                          <Icon
                            icon={isDark ? "lucide:github" : "logos:github-icon"}
                            className="text-2xl mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardBody>
            <CardFooter className="flex-1 flex flex-col items-start gap-2 pt-4">
              <div className="flex items-center gap-4 w-full">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => {
                    handleLike(post.id);
                  }}
                  className="group"
                >
                  <Icon
                    icon={likedPosts[post.id] ? "gravity-ui:heart-fill" : "lucide:heart"}
                    className={`text-2xl transition-all duration-300 ${likedPosts[post.id] ? 'text-red-500 scale-110' : 'group-hover:scale-110'
                      }`}
                  />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => toggleComments(post.id)}
                >
                  <Icon icon="lucide:message-circle" className="text-2xl" />
                </Button>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-small font-semibold text-left">
                  {formatLikes(likes[post.id])} {t('common.likes', 'likes')}
                </p>
                <p className="text-small text-left whitespace-pre-line">
                  {t(`portfolio.posts.${post.id}.caption`, post.caption)}
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-tiny text-primary-500 hover:text-primary-400 cursor-pointer"
                    >
                      {t(`portfolio.posts.${post.id}.tags.${index}`, tag)}
                    </span>
                  ))}
                </div>
              </div>
              {showComments[post.id] && (
                <div className="w-full mt-2" onClick={(e) => e.stopPropagation()}>
                  <div className="max-h-24 overflow-y-auto">
                    {(comments[post.id] || []).map((comment, index) => (
                      <p key={index} className="text-small text-default-600 mb-1 text-left">
                        {comment}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={activeComment}
                      onChange={(e) => setActiveComment(e.target.value)}
                      placeholder={t('common.addComment', 'Add a comment...')}
                      className="flex-1 px-2 py-1 rounded-md bg-default-100"
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => handleComment(post.id)}
                    >
                      {t('common.post', 'Post')}
                    </Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </HeroUIProvider>
  );
};
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const testimonials = [
  {
    id: 1,
    name: "Dr. Srirupa Chakraborty",
    role: "Assistant Professor, Northeastern University",
    avatar: "https://api.dicebear.com/6.x/initials/svg?seed=SC",
    content: "Naveen's work on the AlphaFold pipeline optimization showcased his ability to tackle complex computational challenges with innovative approaches.",
    icon: "lucide:quote"
  },
  {
    id: 2,
    name: "Faiyaz Kadhar Kani",
    role: "Graduate Teaching Assistant, Northeastern University",
    avatar: "https://api.dicebear.com/6.x/initials/svg?seed=FK",
    content: "A brilliant problem solver who consistently delivers high-quality solutions. His expertise in AI and natural language processing was instrumental in developing our AtleeAI platform. A dedicated professional who goes above and beyond.",
    icon: "lucide:quote"
  },
  {
    id: 3,
    name: "Nithish Chandrasekaran",
    role: "Graduate Student, Northeastern University | Former Engineer at Applied Data Finance",
    avatar: "https://api.dicebear.com/6.x/initials/svg?seed=NC",
    content: "Naveen's work on optimizing our database queries led to remarkable performance improvements.",
    icon: "lucide:quote"
  },
];

export const Testimonials = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    },
    onSwipedRight: () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    },
    trackMouse: true // Allows swipe gestures with a mouse as well
  });

  useEffect(() => {
    // Calculate the maximum height of all cards after the component mounts
    const cardBodies = Array.from(document.querySelectorAll('.card-body')) as HTMLElement[];
    const heights = cardBodies.map((cardBody) => cardBody.offsetHeight);
    const maxHeight = Math.max(...heights);
    setMaxHeight(maxHeight);
  }, [testimonials]);

  return (
    <div className="space-y-6">
      <div
        {...swipeHandlers} // Attach swipe handlers
        ref={containerRef} // Attach the ref to the container
        className="flex justify-evenly items-center gap-6 overflow-x-auto py-6 px-4 bg-content1 rounded-lg mt-6 custom-scrollbar"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[300px] max-w-[300px] flex-shrink-0"
          >
            <Card className="h-full">
              <CardBody
                className="gap-4 flex flex-col justify-between card-body overflow-y-auto"
                style={{ height: maxHeight ? `${maxHeight}px` : 'auto' }} // Apply the max height dynamically
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    src={testimonial.avatar}
                    className="w-12 h-12"
                    isBordered
                    color="primary"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-small text-default-500">{testimonial.role}</p>
                  </div>
                  <Icon icon={testimonial.icon} className="w-5 h-5 text-default-400" />
                </div>

                <div className="relative">
                  <Icon
                    icon="lucide:quote"
                    className="absolute -left-2 -top-2 w-6 h-6 text-default-200 opacity-50"
                  />
                  <p className="text-default-600 text-small pl-4">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="lucide:star"
                      className="w-4 h-4 text-warning"
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch Medium RSS feed
    const mediumUsername = 'rrajshreesingh28';
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xmlData = await response.text();
    
    // Simple XML parsing using regex (for basic RSS parsing)
    const articles = [];
    
    // Extract items from RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = xmlData.match(itemRegex);
    
    if (items) {
      items.forEach((item, index) => {
        // Extract title - try multiple patterns
        let title = '';
        const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
        if (titleMatch) {
          title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // If title is empty, try to extract from link and format it properly
        if (!title) {
          const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
          if (linkMatch) {
            const link = linkMatch[1];
            // Extract title from URL path
            const urlParts = link.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            if (lastPart && lastPart.includes('-')) {
              const slugTitle = lastPart.split('?')[0].split('-').slice(0, -1).join(' ');
              // Format the title properly
              title = slugTitle
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            }
          }
        }
        
        // Fallback title
        if (!title) {
          title = `Article ${index + 1}`;
        }
        
        // Extract link
        const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
        const link = linkMatch ? linkMatch[1] : `https://medium.com/@${mediumUsername}`;
        
        // Extract description
        const descMatch = item.match(/<description>([\s\S]*?)<\/description>/);
        let description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '') : 'Published article on Medium';
        description = description.length > 150 ? description.substring(0, 150) + '...' : description;
        
        // Extract content for image
        const contentMatch = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
        let image = '/projects/medium.webp';
        if (contentMatch) {
          const imgMatch = contentMatch[1].match(/<img[^>]+src="([^"]+)"/);
          if (imgMatch) {
            image = imgMatch[1];
          }
        }
        
        // Extract publish date
        const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        const publishedDate = dateMatch ? dateMatch[1] : '';
        
        articles.push({
          title: title,
          description: description,
          url: link,
          image: image,
          blurImage: '/projects/blur/medium-blur.webp',
          gradient: ["#F14658", "#DC2537"],
          tech: ["react", "typescript", "tailwindcss"],
          publishedDate: publishedDate,
          author: mediumUsername
        });
      });
    }
    
    // If no articles found, return fallback data
    if (articles.length === 0) {
      articles.push({
        title: "My Medium Articles",
        description: "Check out my latest articles on Medium covering React, TypeScript, and web development topics.",
        url: `https://medium.com/@${mediumUsername}`,
        image: '/projects/medium.webp',
        blurImage: '/projects/blur/medium-blur.webp',
        gradient: ["#F14658", "#DC2537"],
        tech: ["react", "typescript", "tailwindcss"],
        publishedDate: new Date().toISOString(),
        author: mediumUsername
      });
    }
    
    // Limit to 6 articles for display
    const limitedArticles = articles.slice(0, 6);
    
    res.status(200).json({
      articles: limitedArticles,
      total: articles.length
    });
    
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    
    // Return fallback data on error
    res.status(200).json({
      articles: [{
        title: "My Medium Articles",
        description: "Check out my latest articles on Medium covering React, TypeScript, and web development topics.",
        url: `https://medium.com/@rrajshreesingh28`,
        image: '/projects/medium.webp',
        blurImage: '/projects/blur/medium-blur.webp',
        gradient: ["#F14658", "#DC2537"],
        tech: ["react", "typescript", "tailwindcss"],
        publishedDate: new Date().toISOString(),
        author: "rrajshreesingh28"
      }],
      total: 1
    });
  }
} 
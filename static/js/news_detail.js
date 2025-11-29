// ========== IMAGE GALLERY LIGHTBOX ==========
function initImageGallery() {
    const images = document.querySelectorAll('.article-image');
    
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightbox(index, images);
        });
    });
}

function openLightbox(index, images) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 2rem;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    `;
    
    const img = document.createElement('img');
    img.src = images[index].src;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = '#ef4444';
        closeBtn.style.color = 'white';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'white';
        closeBtn.style.color = 'black';
    });
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '❮';
    prevBtn.style.cssText = `
        position: absolute;
        left: -60px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '❯';
    nextBtn.style.cssText = `
        position: absolute;
        right: -60px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
    `;
    
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        img.src = images[index].src;
        updateImageCounter();
    });
    
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        img.src = images[index].src;
        updateImageCounter();
    });
    
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: absolute;
        bottom: -40px;
        right: 0;
        color: white;
        font-size: 0.9rem;
    `;
    
    function updateImageCounter() {
        counter.textContent = `${index + 1} / ${images.length}`;
    }
    
    updateImageCounter();
    
    content.appendChild(img);
    content.appendChild(closeBtn);
    if (images.length > 1) {
        content.appendChild(prevBtn);
        content.appendChild(nextBtn);
        content.appendChild(counter);
    }
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
}

// ========== READING TIME CALCULATION ==========
function calculateReadingTime() {
    const text = document.querySelector('.article-text');
    if (!text) return;
    
    const words = text.textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    
    const timeElement = document.createElement('span');
    timeElement.className = 'reading-time';
    timeElement.textContent = `⏱️ ${readingTime} мин. чтения`;
    timeElement.style.cssText = `
        display: inline-block;
        padding: 0.5rem 1rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 8px;
        margin-left: 1rem;
        font-size: 0.9rem;
        color: #cbd5e1;
    `;
    
    const meta = document.querySelector('.article-meta');
    if (meta) {
        meta.appendChild(timeElement);
    }
}

// ========== SHARE BUTTONS ==========
function addShareButtons() {
    const title = document.querySelector('.article-title').textContent;
    const url = window.location.href;
    
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';
    shareContainer.style.cssText = `
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding: 2rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 12px;
        flex-wrap: wrap;
    `;
    
    const shareText = document.createElement('p');
    shareText.textContent = 'Поделиться:';
    shareText.style.cssText = `
        width: 100%;
        margin-bottom: 0.5rem;
        font-weight: 600;
    `;
    
    const shares = {
        'Телеграм': `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        'WhatsApp': `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        'Twitter': `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    };
    
    for (let [platform, link] of Object.entries(shares)) {
        const btn = document.createElement('a');
        btn.href = link;
        btn.target = '_blank';
        btn.textContent = platform;
        btn.style.cssText = `
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            font-weight: 600;
        `;
        
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });
        
        shareContainer.appendChild(btn);
    }
    
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        articleBody.appendChild(shareContainer);
    }
}

// ========== TABLE OF CONTENTS (если есть заголовки) ==========
function generateTableOfContents() {
    const headings = document.querySelectorAll('.article-text h2, .article-text h3');
    
    if (headings.length === 0) return;
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.style.cssText = `
        background: rgba(99, 102, 241, 0.1);
        border-left: 4px solid #6366f1;
        padding: 1.5rem;
        margin: 2rem 0;
        border-radius: 8px;
    `;
    
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Содержание';
    tocTitle.style.cssText = `
        margin-bottom: 1rem;
        color: #6366f1;
    `;
    
    const tocList = document.createElement('ul');
    tocList.style.cssText = `
        list-style: none;
        padding: 0;
    `;
    
    headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
        
        const item = document.createElement('li');
        item.style.cssText = `
            margin: 0.5rem 0;
            padding-left: 1rem;
        `;
        
        const link = document.createElement('a');
        link.href = `#heading-${index}`;
        link.textContent = heading.textContent;
        link.style.cssText = `
            color: #6366f1;
            text-decoration: none;
            transition: all 0.3s ease;
        `;
        
        link.addEventListener('mouseover', () => {
            link.style.color = '#ec4899';
            link.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseout', () => {
            link.style.color = '#6366f1';
            link.style.textDecoration = 'none';
        });
        
        item.appendChild(link);
        tocList.appendChild(item);
    });
    
    toc.appendChild(tocTitle);
    toc.appendChild(tocList);
    
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        articleBody.insertBefore(toc, articleBody.firstChild);
    }
}

// ========== PAGE INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('News detail page loaded');
    initImageGallery();
    calculateReadingTime();
    addShareButtons();
    generateTableOfContents();
});
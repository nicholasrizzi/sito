export default function bindVideoFacades() {
    document.querySelectorAll<HTMLButtonElement>('.video-facade').forEach(facade => {
        facade.addEventListener('click', () => {
            const id = facade.dataset.ytId;
            const host = facade.dataset.ytHost || 'www.youtube-nocookie.com';

            const iframe = document.createElement('iframe');
            iframe.src = `https://${host}/embed/${id}?autoplay=1`;
            iframe.title = 'YouTube video player';
            iframe.loading = 'lazy';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;

            facade.replaceWith(iframe);
        }, { once: true });
    });
}

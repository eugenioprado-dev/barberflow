export function scrollToSection(id: string) {
    const section = document.getElementById(id);

    if (!section) {
        return;
    }

    const headerOffset = 35;
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition =
        sectionPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
}
import { attr, observable, FASTElement } from "@microsoft/fast-element";
import {
    CommunityContentPlacementData,
    communityContentPlacementData,
} from "../../data/community.data";

export class SideNavigation extends FASTElement {
    @attr
    public category: string;

    @observable
    public currentSection: string = "hero";

    @observable
    public sectionArray: HTMLElement[] = Array.from(
        document.querySelectorAll("section[id]")
    );

    public socialData: CommunityContentPlacementData[] = communityContentPlacementData.filter(
        x => x.header !== "Github"
    );

    constructor() {
        super();

        if (this.getAttribute("category") === "scroll") {
            let observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        const areaOnScreen =
                            entry.intersectionRatio * entry.boundingClientRect.height;
                        if (areaOnScreen > 0.5 * window.innerHeight) {
                            this.currentSection = entry.target.id;
                        }
                    });
                },
                { threshold: [0, 0.2, 0.4, 0.6, 0.8] }
            );
            this.sectionArray.forEach(section => {
                observer.observe(section);
            });
        }
    }
}
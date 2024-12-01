const HowToUseModal = (): JSX.Element => {
    return (
        <>
            <div className="mb-20">
                <h2>How to use Paletta</h2>
                <p>
                    This app helps you to create color palettes with compliant
                    contrast ratios. Here is a guide on how you can use it:
                </p>
            </div>
            <div className="mb-20">
                <h3>Change contrast levels</h3>
                <p>
                    Select a contrast level from the menu (Level AAA, Level AA,
                    or Level A).
                </p>
                <p>
                    The contrast ratios displayed on each color bar will be
                    adjusted right away based on the chosen level
                </p>
            </div>
            <div className="mb-20">
                <h3>Modes of operation</h3>
                <p>
                    There are three modes of operation: Adjacent colors, Compare
                    All and Find Third Color
                </p>
            </div>
            <div className="mb-20">
                <h4>Adjacent mode</h4>
                <p>
                    This mode calculates contrast between each colorbar and its
                    immediate adjacents. You can change the colors by clicking
                    on the color input at the bottom of each colorbar
                </p>
                <p>
                    <strong>Drag and drop</strong>: Reorder color bars by
                    dragging them, allowing you to test different color
                    cominations.
                </p>
                <p>
                    <strong>Add colors</strong>: Use the &quot;+ Add color&quot;
                    button to introduce new colors (up to a maximum of 20 at the
                    same time)
                </p>
                <p>
                    <strong>Remove colors</strong>: Click on the &quot;X&quot;
                    on any color bar to remove it
                </p>
            </div>
            <div className="mb-20">
                <h4>Compare All mode</h4>
                <p>
                    This mode compares the contrast between all colors
                    you&apos;ve added You can use it as a tool to rearrange and
                    adjust colors more precisely
                </p>
                <p>
                    By looking at the colors this way, you can discover that
                    your second and ninth color are complying. You can switch
                    mode to the Adjacent mode, and stack them side by side.
                </p>
            </div>
            <div className="mb-20">
                <h4>Find Third Color mode</h4>
                <p>
                    Input two colors, and the app will generate a third color
                    that fits between them based on your selected contrast
                    ratio.
                </p>
                <p>
                    The third color is recalculated automatically as contrast
                    levels are adjusted.
                </p>
            </div>
            <div className="mb-20">
                <h3>Keyboard navigation</h3>
                <p>
                    Use spacebar to pick up a color bar, and then arrow keys to
                    find a new place for it.
                </p>
                <p>
                    The color bar already in place will automatically shift to
                    the left or right side, depending on which way you are using
                    your arrow keys.
                </p>
                <p>
                    Use spacebar or enter to drop the color bar in its desired
                    position.
                </p>
            </div>
            <p>
                Use this tool to create acceessible and visually appealing color
                combinations. If you find a bug or have a good idea, please
                reach out on{' '}
                <a href="https://github.com/marvin19/Paletta">GitHub</a>
            </p>
        </>
    );
};

export default HowToUseModal;

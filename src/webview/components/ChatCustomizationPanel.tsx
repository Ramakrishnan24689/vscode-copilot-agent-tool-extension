import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Label,
  Input,
  Slider,
  Switch,
  Field,
  Dropdown,
  Option,
} from "@fluentui/react-components";

interface ChatCustomizationPanelProps {
  styleOptions: any;
  onStyleChange: (key: string, value: any) => void;
}

// Popular font families for the dropdown
const POPULAR_FONTS = [
  { label: "Segoe UI", value: "Segoe UI" },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
];

export const ChatCustomizationPanel: React.FC<ChatCustomizationPanelProps> = ({
  styleOptions,
  onStyleChange,
}) => {  const renderColorInput = (
    label: string,
    styleKey: string,
    value: string
  ) => (
    <Field label={label} style={{ marginBottom: "1rem" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={(e) => {
            console.log(`Color picker changed - ${label} (${styleKey}):`, e.target.value);
            onStyleChange(styleKey, e.target.value);
          }}
          style={{
            width: 40,
            height: 32,
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            backgroundColor: 'transparent'
          }}
        />
        <Input
          type="text"
          value={value || ''}
          onChange={(_, data) => {
            console.log(`Text input changed - ${label} (${styleKey}):`, data.value);
            onStyleChange(styleKey, data.value);
          }}
          placeholder="#000000"
          style={{ width: '120px' }}
        />
      </div>
    </Field>
  );

  const renderSlider = (
    label: string,
    styleKey: string,
    value: number,
    min: number = 0,
    max: number = 100
  ) => (
    <Field label={`${label}: ${value}`} style={{ marginBottom: "1rem" }}>
      <Slider
        min={min}
        max={max}
        value={value || min}
        onChange={(_, data) => onStyleChange(styleKey, data.value)}
      />
    </Field>
  );

  const renderTextInput = (
    label: string,
    styleKey: string,
    value: string,
    placeholder: string = ""
  ) => (
    <Field label={label} style={{ marginBottom: "1rem" }}>
      <Input
        value={value || ''}
        onChange={(_, data) => onStyleChange(styleKey, data.value)}
        placeholder={placeholder}
      />
    </Field>
  );
  const renderSwitch = (
    label: string,
    styleKey: string,
    value: boolean
  ) => (
    <Field label={label} style={{ marginBottom: "1rem" }}>
      <Switch
        checked={value || false}
        onChange={(_, data) => onStyleChange(styleKey, data.checked)}
      />
    </Field>
  );
  const renderFontDropdown = (
    label: string,
    styleKey: string,
    value: string
  ) => (
    <Field label={label} style={{ marginBottom: "1rem" }}>
      <Dropdown
        value={value || "Segoe UI"}
        selectedOptions={[value || "Segoe UI"]}
        onOptionSelect={(_, data) => {
          if (data.optionValue) {
            onStyleChange(styleKey, data.optionValue);
          }
        }}
        style={{ width: '200px' }}
      >
        {POPULAR_FONTS.map((font) => (
          <Option key={font.value} value={font.value} text={font.label}>
            <span style={{ fontFamily: font.value }}>
              {font.label}
            </span>
          </Option>
        ))}
      </Dropdown>
    </Field>
  );

  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <Accordion defaultOpenItems={["general"]} collapsible multiple>
        {/* General */}
        <AccordionItem value="general">
          <AccordionHeader>General</AccordionHeader>          <AccordionPanel>
            {renderColorInput("Accent Color", "accent", styleOptions.accent)}
            {renderColorInput("Background Color", "backgroundColor", styleOptions.backgroundColor)}
            {renderFontDropdown("Primary Font", "primaryFont", styleOptions.primaryFont)}
            {renderTextInput("Monospace Font", "monospaceFont", styleOptions.monospaceFont, "Consolas")}
            {renderTextInput("Root Height", "rootHeight", styleOptions.rootHeight, "100%")}
            {renderTextInput("Root Width", "rootWidth", styleOptions.rootWidth, "100%")}
          </AccordionPanel>
        </AccordionItem>

        {/* Send Box */}
        <AccordionItem value="sendbox">
          <AccordionHeader>Send Box</AccordionHeader>
          <AccordionPanel>
            {renderColorInput("Background Color", "sendBoxBackground", styleOptions.sendBoxBackground)}
            {renderColorInput("Button Color", "sendBoxButtonColor", styleOptions.sendBoxButtonColor)}
            {renderColorInput("Button Hover Color", "sendBoxButtonColorOnHover", styleOptions.sendBoxButtonColorOnHover)}
            {renderColorInput("Text Color", "sendBoxTextColor", styleOptions.sendBoxTextColor)}
            {renderColorInput("Placeholder Color", "sendBoxPlaceholderColor", styleOptions.sendBoxPlaceholderColor)}
            {renderTextInput("Border Top", "sendBoxBorderTop", styleOptions.sendBoxBorderTop, "solid 1px #808080")}
            {renderSlider("Height", "sendBoxHeight", styleOptions.sendBoxHeight, 40, 120)}
            {renderSwitch("Hide Upload Button", "hideUploadButton", styleOptions.hideUploadButton)}
          </AccordionPanel>
        </AccordionItem>

        {/* Avatar */}
        <AccordionItem value="avatar">
          <AccordionHeader>Avatar</AccordionHeader>
          <AccordionPanel>
            {renderSlider("Size", "avatarSize", styleOptions.avatarSize, 10, 100)}
            {renderTextInput("Border Radius", "avatarBorderRadius", styleOptions.avatarBorderRadius, "50%")}
            
            <Label style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', display: 'block' }}>Bot Avatar</Label>
            {renderColorInput("Bot Background Color", "botAvatarBackgroundColor", styleOptions.botAvatarBackgroundColor)}
            {renderTextInput("Bot Image URL", "botAvatarImage", styleOptions.botAvatarImage, "https://example.com/bot.png")}
            {renderTextInput("Bot Initials", "botAvatarInitials", styleOptions.botAvatarInitials, "B")}

            <Label style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', display: 'block' }}>User Avatar</Label>
            {renderColorInput("User Background Color", "userAvatarBackgroundColor", styleOptions.userAvatarBackgroundColor)}
            {renderTextInput("User Image URL", "userAvatarImage", styleOptions.userAvatarImage, "https://example.com/user.png")}
            {renderTextInput("User Initials", "userAvatarInitials", styleOptions.userAvatarInitials, "U")}
          </AccordionPanel>
        </AccordionItem>

        {/* Bubble */}
        <AccordionItem value="bubble">
          <AccordionHeader>Bubble</AccordionHeader>
          <AccordionPanel>
            {renderSlider("Border Radius", "bubbleBorderRadius", styleOptions.bubbleBorderRadius, 0, 50)}
            {renderSlider("Min Height", "bubbleMinHeight", styleOptions.bubbleMinHeight, 30, 100)}
            
            <Label style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', display: 'block' }}>User Bubbles</Label>
            {renderColorInput("User Background Color", "bubbleFromUserBackground", styleOptions.bubbleFromUserBackground)}
            {renderColorInput("User Text Color", "bubbleFromUserTextColor", styleOptions.bubbleFromUserTextColor)}
            {renderColorInput("User Border Color", "bubbleFromUserBorderColor", styleOptions.bubbleFromUserBorderColor)}
            {renderSlider("User Border Radius", "bubbleFromUserBorderRadius", styleOptions.bubbleFromUserBorderRadius, 0, 50)}

            <Label style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', display: 'block' }}>Bot Bubbles</Label>
            {renderColorInput("Bot Background Color", "bubbleBackground", styleOptions.bubbleBackground)}
            {renderColorInput("Bot Text Color", "bubbleTextColor", styleOptions.bubbleTextColor)}
            {renderColorInput("Bot Border Color", "bubbleBorderColor", styleOptions.bubbleBorderColor)}
          </AccordionPanel>
        </AccordionItem>        {/* Suggested Actions */}
        <AccordionItem value="suggestions">
          <AccordionHeader>Suggested Actions</AccordionHeader>
          <AccordionPanel>
            {renderColorInput("Background Color", "suggestedActionBackgroundColor", styleOptions.suggestedActionBackgroundColor)}
            {renderColorInput("Hover Background Color", "suggestedActionBackgroundColorOnHover", styleOptions.suggestedActionBackgroundColorOnHover)}
            {renderColorInput("Text Color", "suggestedActionTextColor", styleOptions.suggestedActionTextColor)}
            {renderColorInput("Border Color", "suggestedActionBorderColor", styleOptions.suggestedActionBorderColor)}
            {renderSlider("Border Radius", "suggestedActionBorderRadius", styleOptions.suggestedActionBorderRadius, 0, 50)}
            {renderSlider("Border Width", "suggestedActionBorderWidth", styleOptions.suggestedActionBorderWidth, 0, 10)}
            {renderTextInput("Layout", "suggestedActionLayout", styleOptions.suggestedActionLayout, "flow")}
          </AccordionPanel>
        </AccordionItem>

        {/* Advanced */}
        <AccordionItem value="advanced">
          <AccordionHeader>Advanced</AccordionHeader>
          <AccordionPanel>
            {renderSlider("Message Max Width", "bubbleMessageMaxWidth", styleOptions.bubbleMessageMaxWidth, 200, 800)}
            {renderSlider("Message Min Width", "bubbleMessageMinWidth", styleOptions.bubbleMessageMinWidth, 80, 300)}
            {renderSlider("Padding Regular", "paddingRegular", styleOptions.paddingRegular, 5, 30)}
            {renderTextInput("Font Size Small", "fontSizeSmall", styleOptions.fontSizeSmall, "70%")}
            {renderTextInput("Message Word Break", "messageActivityWordBreak", styleOptions.messageActivityWordBreak, "break-word")}
            {renderSwitch("Auto Scroll Snap", "autoScrollSnapOnPage", styleOptions.autoScrollSnapOnPage)}
            {renderSwitch("Show Emoji Set", "emojiSet", styleOptions.emojiSet)}
            {renderColorInput("Subtle Color", "subtleColor", styleOptions.subtleColor)}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ChatCustomizationPanel;

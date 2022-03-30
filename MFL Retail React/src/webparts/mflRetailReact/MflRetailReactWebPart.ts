import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MflRetailReactWebPartStrings';
import MflRetailReact from './components/MflRetailReact';
import { IMflRetailReactProps } from './components/IMflRetailReactProps';

export interface IMflRetailReactWebPartProps {
  description: string;
}

export default class MflRetailReactWebPart extends BaseClientSideWebPart<IMflRetailReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMflRetailReactProps> = React.createElement(
      MflRetailReact,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  product: {
    Tables: {
      products: {
        Row: {
          created_at: string
          id: number
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      variant_attribute_values: {
        Row: {
          created_at: string
          id: number
          name: string
          product_id: number
          updated_at: string
          variant_attribute_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          product_id: number
          updated_at?: string
          variant_attribute_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          product_id?: number
          updated_at?: string
          variant_attribute_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "variant_attribute_values_attribute_id_fkey"
            columns: ["variant_attribute_id"]
            isOneToOne: false
            referencedRelation: "variant_attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_attribute_values_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_attributes: {
        Row: {
          created_at: string
          id: number
          name: string
          product_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          product_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_values: {
        Row: {
          created_at: string
          id: number
          product_id: number
          updated_at: string
          variant_attribute_id: number
          variant_attribute_value_id: number
          variant_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          updated_at?: string
          variant_attribute_id: number
          variant_attribute_value_id: number
          variant_id: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          updated_at?: string
          variant_attribute_id?: number
          variant_attribute_value_id?: number
          variant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "variant_values_attribute_fk"
            columns: ["variant_attribute_id", "product_id"]
            isOneToOne: false
            referencedRelation: "variant_attributes"
            referencedColumns: ["id", "product_id"]
          },
          {
            foreignKeyName: "variant_values_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_values_value_fk"
            columns: ["variant_attribute_value_id", "variant_attribute_id"]
            isOneToOne: false
            referencedRelation: "variant_attribute_values"
            referencedColumns: ["id", "variant_attribute_id"]
          },
          {
            foreignKeyName: "variant_values_variant_attribute_id_fkey"
            columns: ["variant_attribute_id"]
            isOneToOne: false
            referencedRelation: "variant_attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_values_variant_attribute_value_id_fkey"
            columns: ["variant_attribute_value_id"]
            isOneToOne: false
            referencedRelation: "variant_attribute_values"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_values_variant_fk"
            columns: ["variant_id", "product_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id", "product_id"]
          },
          {
            foreignKeyName: "variant_values_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          created_at: string
          id: number
          product_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "product">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  product: {
    Enums: {},
  },
} as const

export type TableNames = keyof Database["product"]["Tables"];
